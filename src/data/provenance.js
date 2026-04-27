import colleges from './collegeDataset';
import provenanceChecklist from './provenanceChecklist.json';

const DEFAULT_PROVENANCE = {
  status: 'indicative',
  confidence: 'medium',
  verifiedOn: null,
  sourceLinks: [],
};

const STALE_AFTER_DAYS = 90;
const REQUIRED_SOURCE_KEYS = ['officialWebsite', 'placementReport', 'feePage', 'nirf'];

const provenanceOverrides = {
  'col-017': {
    status: 'verified',
    confidence: 'high',
    verifiedOn: '2026-04-25',
    sourceLinks: [
      { label: 'Official Website', url: 'https://mastersunion.org' },
      { label: 'NIRF Portal', url: 'https://www.nirfindia.org/' },
      { label: 'Fee & Program Details Search', url: 'https://www.google.com/search?q=Masters%27+Union+fees+official+site' },
      { label: 'Placement Details Search', url: 'https://www.google.com/search?q=Masters%27+Union+placements+official+report' },
    ],
  },
  'col-057': {
    status: 'verified',
    confidence: 'high',
    verifiedOn: '2026-04-25',
    sourceLinks: [
      { label: 'Official Website', url: 'https://www.iima.ac.in' },
      { label: 'NIRF Portal', url: 'https://www.nirfindia.org/' },
      { label: 'Placement Report Search', url: 'https://www.google.com/search?q=IIM+Ahmedabad+placement+report+official' },
      { label: 'Fee Details Search', url: 'https://www.google.com/search?q=IIM+Ahmedabad+MBA+fees+official' },
    ],
  },
  'col-060': {
    status: 'verified',
    confidence: 'high',
    verifiedOn: '2026-04-25',
    sourceLinks: [
      { label: 'Official Website', url: 'https://www.isb.edu' },
      { label: 'NIRF Portal', url: 'https://www.nirfindia.org/' },
      { label: 'Placement Report Search', url: 'https://www.google.com/search?q=ISB+Hyderabad+placement+report+official' },
      { label: 'Fee Details Search', url: 'https://www.google.com/search?q=ISB+Hyderabad+PGP+fees+official' },
    ],
  },
};

function buildDefaultSources(college) {
  const sourceLinks = [];

  if (college.officialWebsite) {
    sourceLinks.push({
      label: 'Official college website',
      url: college.officialWebsite,
    });
  } else {
    sourceLinks.push({
      label: 'Official college website (search)',
      url: `https://www.google.com/search?q=${encodeURIComponent(`${college.name} official website`)}`,
    });
  }

  const domain = getDomainFromUrl(college.officialWebsite);
  const domainScopedPlacementQuery = domain
    ? `site:${domain} placement report brochure ${college.name}`
    : `${college.name} official placement report brochure`;
  const domainScopedFeeQuery = domain
    ? `site:${domain} fee structure tuition fees ${college.name}`
    : `${college.name} official fee structure`;

  sourceLinks.push({
    label: 'Official placement report / brochure',
    url: `https://www.google.com/search?q=${encodeURIComponent(domainScopedPlacementQuery)}`,
  });

  sourceLinks.push({
    label: 'Official fee structure page',
    url: `https://www.google.com/search?q=${encodeURIComponent(domainScopedFeeQuery)}`,
  });

  sourceLinks.push({
    label: 'NIRF (where relevant)',
    url: `https://www.google.com/search?q=${encodeURIComponent(`NIRF ${college.name}`)}`,
  });

  return sourceLinks;
}

function getDomainFromUrl(url) {
  if (!url) return '';

  try {
    const parsed = new URL(url);
    return parsed.hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

export const collegeProvenance = Object.fromEntries(
  colleges.map((college) => {
    const override = provenanceOverrides[college.id] || {};
    const checklistItem = provenanceChecklist[college.id] || null;
    const checklistMeta = getChecklistMeta(checklistItem);

    const status = checklistMeta.isChecklistVerified
      ? 'verified'
      : (override.status || DEFAULT_PROVENANCE.status);
    const confidence = checklistMeta.isChecklistVerified
      ? checklistMeta.confidence
      : (override.confidence || DEFAULT_PROVENANCE.confidence);
    const verifiedOn = checklistMeta.isChecklistVerified
      ? checklistMeta.verifiedOn
      : (override.verifiedOn || DEFAULT_PROVENANCE.verifiedOn);

    return [
      college.id,
      {
        ...DEFAULT_PROVENANCE,
        ...override,
        status,
        confidence,
        verifiedOn,
        sourceLinks: override.sourceLinks || buildDefaultSources(college),
        checklistMeta,
      },
    ];
  })
);

export function getCollegeProvenance(id) {
  return collegeProvenance[id] || DEFAULT_PROVENANCE;
}

function getChecklistMeta(checklistItem) {
  if (!checklistItem) {
    return {
      isChecklistVerified: false,
      completedSourceChecks: 0,
      requiredSourceChecks: REQUIRED_SOURCE_KEYS.length,
      missingChecks: [...REQUIRED_SOURCE_KEYS],
      reviewedBy: null,
      notes: null,
      verifiedOn: null,
      confidence: null,
    };
  }

  const missingChecks = REQUIRED_SOURCE_KEYS.filter((key) => checklistItem[key] !== true);
  const completedSourceChecks = REQUIRED_SOURCE_KEYS.length - missingChecks.length;
  const isChecklistVerified =
    missingChecks.length === 0 &&
    typeof checklistItem.verifiedOn === 'string' && checklistItem.verifiedOn.trim().length > 0 &&
    typeof checklistItem.confidence === 'string' && checklistItem.confidence.trim().length > 0;

  return {
    isChecklistVerified,
    completedSourceChecks,
    requiredSourceChecks: REQUIRED_SOURCE_KEYS.length,
    missingChecks,
    reviewedBy: checklistItem.reviewedBy || null,
    notes: checklistItem.notes || null,
    verifiedOn: checklistItem.verifiedOn || null,
    confidence: checklistItem.confidence || null,
  };
}

export function getVerificationChecklistProgress() {
  const totals = {
    totalColleges: colleges.length,
    verifiedByChecklist: 0,
    pendingVerification: 0,
  };

  colleges.forEach((college) => {
    const checklistMeta = getChecklistMeta(provenanceChecklist[college.id] || null);
    if (checklistMeta.isChecklistVerified) {
      totals.verifiedByChecklist += 1;
    }
  });

  totals.pendingVerification = totals.totalColleges - totals.verifiedByChecklist;
  return totals;
}

export function getRequiredSourceKeys() {
  return [...REQUIRED_SOURCE_KEYS];
}

function getDaysSince(dateStr) {
  if (!dateStr) return null;

  const parsedDate = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(parsedDate.getTime())) return null;

  const now = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;

  return Math.floor((now.getTime() - parsedDate.getTime()) / msPerDay);
}

export function getProvenanceMeta(provenance) {
  const daysSinceVerification = getDaysSince(provenance?.verifiedOn || null);
  const isStale =
    typeof daysSinceVerification === 'number' &&
    daysSinceVerification > STALE_AFTER_DAYS;

  return {
    isStale,
    staleAfterDays: STALE_AFTER_DAYS,
    daysSinceVerification,
  };
}
