import { Candidate, StatePollData, PollStats, CharityBeneficiary } from '../types';

export const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: 'obi-peter',
    name: 'Peter Gregory Obi',
    party: 'Labour Party',
    partyAcronym: 'LP',
    partyColor: '#10b981',
    age: 65,
    runningMate: 'Datti Baba-Ahmed',
    photoUrl: '/images/candidate_obi_1794056621634.jpg',
    biography: 'Former two-term Governor of Anambra State (2006–2014) and 2023 Presidential Candidate. Known for fiscal prudence, grassroots youth movement leadership, and education funding reforms.',
    experience: [
      'Executive Governor of Anambra State (2006–2014)',
      'Former Chairman of Fidelity Bank Plc',
      'Member, Nigerian Economic Management Team',
      'Chairman, South-East Governors Forum'
    ],
    manifestoPillars: [
      { title: 'Consumption to Production Transition', description: 'Transforming Nigeria into an agro-industrial powerhouse with targeted investments in the agricultural belt.' },
      { title: 'Fiscal Discipline & Anti-Corruption', description: 'Eliminating cost of governance, consolidating federal ministries, and introducing transparent digital budget tracking.' },
      { title: 'Human Capital & Tech Education', description: 'Dedicating over 15% of national budget to primary/tertiary education and youth digital skill hubs across all 774 LGAs.' }
    ],
    officialWebsite: 'https://peterobi.org',
    verifiedStatus: true,
    votes: 42150,
    totalAmountNgn: 64800000
  },
  {
    id: 'tinubu-bola',
    name: 'Asiwaju Bola Ahmed Tinubu',
    party: 'All Progressives Congress',
    partyAcronym: 'APC',
    partyColor: '#0ea5e9',
    age: 74,
    runningMate: 'Kashim Shettima',
    photoUrl: '/images/candidate_tinubu_1794056620399.jpg',
    biography: 'Current President of the Federal Republic of Nigeria and former two-term Governor of Lagos State (1999–2007). Longtime advocate of the progressive political coalition and democratic restoration.',
    experience: [
      'President of the Federal Republic of Nigeria (2023–Present)',
      'Executive Governor of Lagos State (1999–2007)',
      'Senator for Lagos West Senatorial District (1992–1993)',
      'Senior Executive at Mobil Oil Nigeria'
    ],
    manifestoPillars: [
      { title: 'Economic Modernisation & Tax Reform', description: 'Streamlining national fiscal policy, enhancing non-oil revenue, and establishing single-window port clearance.' },
      { title: 'National Infrastructure Expansion', description: 'Completing the Lagos-Calabar Coastal Highway, Sokoto-Badagry expressway, and national grid revitalization.' },
      { title: 'Security Modernisation & Counter-Terrorism', description: 'Deploying high-tech aerial surveillance, expanding tactical troop readiness, and reinforcing regional stability.' }
    ],
    officialWebsite: 'https://statehouse.gov.ng',
    verifiedStatus: true,
    votes: 38420,
    totalAmountNgn: 59200000
  },
  {
    id: 'atiku-abubakar',
    name: 'Alhaji Atiku Abubakar',
    party: 'Peoples Democratic Party',
    partyAcronym: 'PDP',
    partyColor: '#ef4444',
    age: 80,
    runningMate: 'Ifeanyi Okowa',
    photoUrl: '/images/candidate_atiku_1794056621636.jpg',
    biography: 'Former Vice President of the Federal Republic of Nigeria (1999–2007) and veteran industrialist. Philanthropist and founder of the American University of Nigeria, Yola.',
    experience: [
      'Vice President of Nigeria (1999–2007)',
      'Deputy Director, Nigerian Customs Service',
      'Elected Governor of Adamawa State (1998)',
      'Founder, American University of Nigeria (AUN)'
    ],
    manifestoPillars: [
      { title: 'Devolution of Powers & Restructuring', description: 'Reallocating constitutional responsibilities to state governments to unlock regional competitive advantages.' },
      { title: 'Private-Sector Driven Industrial Growth', description: 'Unlocking $25B in annual diaspora and foreign direct investment through aggressive market deregulation.' },
      { title: 'National Unity & Social Cohesion', description: 'Enforcing meritocratic civil service appointments and broad-based regional inclusivity across government boards.' }
    ],
    officialWebsite: 'https://atiku.org',
    verifiedStatus: true,
    votes: 29840,
    totalAmountNgn: 44100000
  },
  {
    id: 'kwankwaso-rabiu',
    name: 'Engr. Rabiu Musa Kwankwaso',
    party: 'New Nigeria Peoples Party',
    partyAcronym: 'NNPP',
    partyColor: '#f97316',
    age: 70,
    runningMate: 'Isaac Idahosa',
    photoUrl: '/images/candidate_kwankwaso_1794056621503.jpg',
    biography: 'Former Governor of Kano State (1999–2003, 2011–2015), former Minister of Defence (2003–2007), and Senator representing Kano Central. Leader of the Kwankwasiyya political movement.',
    experience: [
      'Executive Governor of Kano State (1999–2003, 2011–2015)',
      'Minister of Defence, Federal Republic of Nigeria (2003–2007)',
      'Senator for Kano Central Senatorial District (2015–2019)',
      'Deputy Speaker, House of Representatives (1992–1993)'
    ],
    manifestoPillars: [
      { title: 'Free Universal Education & Scholarships', description: 'Replicating Kano state model nationwide with fully funded overseas scholarships and STEM focus.' },
      { title: 'Civil Service & Youth Technical Employment', description: 'Direct vocational training academies and micro-capital grants for young graduates in artisanal industries.' },
      { title: 'Defence Reorganization & Border Security', description: 'Strengthening community policing frameworks and modernizing equipment for the Nigerian armed forces.' }
    ],
    officialWebsite: 'https://kwankwasiyya.org',
    verifiedStatus: true,
    votes: 18760,
    totalAmountNgn: 26500000
  },
  {
    id: 'sowore-omoyele',
    name: 'Omoyele Sowore',
    party: 'African Action Congress',
    partyAcronym: 'AAC',
    partyColor: '#8b5cf6',
    age: 55,
    runningMate: 'Haruna Garba Magashi',
    photoUrl: '/images/candidate_sowore_1794057491616.jpg',
    biography: 'Human rights activist, investigative journalist, and founder of Sahara Reporters. Leader of the #RevolutionNow movement advocating for radical systemic transformation in Nigerian governance.',
    experience: [
      'Founder and Publisher, Sahara Reporters',
      'President, University of Lagos Student Union Government (1992–1994)',
      'Presidential Candidate, AAC (2019, 2023)',
      'International Civic Rights Advocate'
    ],
    manifestoPillars: [
      { title: 'Radical Anti-Corruption & Wealth Recovery', description: 'Immediate repatriation of looted public funds, cancellation of sovereign debt conditionalities, and public sector salary equality.' },
      { title: 'Living Minimum Wage (₦250k+)', description: 'Indexing national minimum wage to realistic cost-of-living metrics and inflation rates for working families.' },
      { title: 'Universal Healthcare & Social Housing', description: 'Building state-funded housing blocks across all major industrial centres and free primary healthcare coverage.' }
    ],
    officialWebsite: 'https://aacparty.org',
    verifiedStatus: true,
    votes: 9420,
    totalAmountNgn: 13800000
  },
  {
    id: 'undecided-reform',
    name: 'Prof. Christopher Imumolen & Youth Coalition',
    party: 'Accord / Independent Youth Reform',
    partyAcronym: 'A/ADC',
    partyColor: '#eab308',
    age: 44,
    runningMate: 'Balarabe Rufai',
    photoUrl: '/images/candidate_reform_1794057719896.jpg',
    biography: 'Academic, industrial tech entrepreneur, and youth empowerment advocate. Representing independent progressive reform, educational tech digitization, and technocratic public administration.',
    experience: [
      'Civic Society Representation',
      'Technocratic & Policy Think-Tank Consensus',
      'Youth & Diaspora Innovation Coalition'
    ],
    manifestoPillars: [
      { title: 'Constitutional Modernisation', description: 'Digital governance adoption, electoral transparency reform, and independent judicial funding.' },
      { title: 'Green Energy & Solar Microgrids', description: 'Decentralized clean power generation across 10,000 rural communities within 36 months.' },
      { title: 'Open Public Data Access', description: 'Mandatory real-time public accounting of all government contract awards and oil revenues.' }
    ],
    verifiedStatus: true,
    votes: 11210,
    totalAmountNgn: 16600000
  }
];

export const INITIAL_STATS: PollStats = {
  totalVerifiedParticipants: 149800,
  totalPoolAmountNgn: 225000000,
  currentPollLeader: INITIAL_CANDIDATES[0],
  lastUpdatedTimestamp: new Date().toISOString()
};

export const INITIAL_CHARITIES: CharityBeneficiary[] = [
  {
    id: 'charity-1',
    name: 'Little Saints Orphanage Foundation',
    category: 'Orphanage',
    location: 'Palmgrove, Lagos State',
    state: 'Lagos',
    cacNumber: 'CAC/IT/NO: 8492',
    verifiedDate: '2025-01-14',
    verificationBadge: true,
    mission: 'Providing emergency shelter, high-quality primary and secondary education, and spiritual rehabilitation for abandoned children across Lagos and Ogun states.',
    currentProject: 'Expansion of digital literacy classroom and vocational workshop facility in Ogudu.',
    beneficiariesCount: 168,
    allocatedAmountNgn: 4500000,
    disbursedAmountNgn: 4500000,
    lastDisbursementDate: '2026-10-18',
    proofDocumentUrl: 'https://littlesaintsorphanage.org/audit'
  },
  {
    id: 'charity-2',
    name: 'Abuja Motherless Babies & Children Care',
    category: 'Motherless Babies Home',
    location: 'Gwarinpa, FCT Abuja',
    state: 'FCT (Abuja)',
    cacNumber: 'CAC/IT/NO: 12431',
    verifiedDate: '2025-03-22',
    verificationBadge: true,
    mission: 'Care and nutritional sustenance for orphaned infants, emergency infant medical incubators, and pediatric nurse care.',
    currentProject: 'Provision of therapeutic infant nutrition formula and clean solar borehole water system.',
    beneficiariesCount: 92,
    allocatedAmountNgn: 3200000,
    disbursedAmountNgn: 3200000,
    lastDisbursementDate: '2026-10-24',
    proofDocumentUrl: 'https://abujababieshome.org.ng/transparency'
  },
  {
    id: 'charity-3',
    name: 'Grassroots Civic Democracy & Voter Literacy Network',
    category: 'Civic Education NGO',
    location: 'Bodija, Ibadan, Oyo State',
    state: 'Oyo',
    cacNumber: 'CAC/IT/NO: 19804',
    verifiedDate: '2025-05-10',
    verificationBadge: true,
    mission: 'Translating civic rights and voter registration education into 12 indigenous Nigerian languages in rural markets and farming settlements.',
    currentProject: 'Town hall town-crier outreach and civic pocket guides distributed across 45 rural local councils.',
    beneficiariesCount: 24500,
    allocatedAmountNgn: 3800000,
    disbursedAmountNgn: 3800000,
    lastDisbursementDate: '2026-10-28',
    proofDocumentUrl: 'https://civicdemocracynet.ng/reports'
  },
  {
    id: 'charity-4',
    name: 'Hope Children’s Home & Family Support',
    category: 'Orphanage',
    location: 'Independence Layout, Enugu',
    state: 'Enugu',
    cacNumber: 'CAC/IT/NO: 11029',
    verifiedDate: '2025-06-18',
    verificationBadge: true,
    mission: 'Holistic rehabilitation, secondary education sponsorship, and nutritional care for vulnerable children across the South-East.',
    currentProject: 'Secondary education scholarship fund and dormitory solar inverter installation.',
    beneficiariesCount: 74,
    allocatedAmountNgn: 2100000,
    disbursedAmountNgn: 2100000,
    lastDisbursementDate: '2026-10-30',
    proofDocumentUrl: 'https://hopechildrenenugu.org/transparency'
  },
  {
    id: 'charity-5',
    name: 'Kano Youth Civic & Orphan Care Initiative',
    category: 'Youth Empowerment',
    location: 'Nasarawa GRA, Kano State',
    state: 'Kano',
    cacNumber: 'CAC/IT/NO: 14755',
    verifiedDate: '2025-08-04',
    verificationBadge: true,
    mission: 'Providing remedial literacy, digital coding training, and vocational tailoring machinery to adolescent orphans.',
    currentProject: 'Empowerment of 50 adolescent orphans with industrial sewing machines and tech literacy kits.',
    beneficiariesCount: 140,
    allocatedAmountNgn: 2900000,
    disbursedAmountNgn: 2200000,
    lastDisbursementDate: '2026-11-03',
    proofDocumentUrl: 'https://kanoyouthcare.org/audit'
  }
];

export const INITIAL_STATES: StatePollData[] = [
  {
    stateCode: 'LA',
    stateName: 'Lagos',
    zone: 'South West',
    participants: 18400,
    totalAmountNgn: 27600000,
    candidateVotes: { 'tinubu-bola': 8832, 'obi-peter': 5888, 'atiku-abubakar': 1840, 'kwankwaso-rabiu': 368, 'sowore-omoyele': 920, 'undecided-reform': 552 },
    candidateAmounts: { 'tinubu-bola': 13248000, 'obi-peter': 8832000, 'atiku-abubakar': 2760000, 'kwankwaso-rabiu': 552000, 'sowore-omoyele': 1380000, 'undecided-reform': 828000 },
    leadingCandidateId: 'tinubu-bola',
    topCivicIssue: 'Mass Transit Multimodal & Digital Creative Economy'
  },
  {
    stateCode: 'KN',
    stateName: 'Kano',
    zone: 'North West',
    participants: 14200,
    totalAmountNgn: 21300000,
    candidateVotes: { 'kwankwaso-rabiu': 6532, 'tinubu-bola': 3408, 'atiku-abubakar': 2556, 'obi-peter': 994, 'sowore-omoyele': 426, 'undecided-reform': 284 },
    candidateAmounts: { 'kwankwaso-rabiu': 9798000, 'tinubu-bola': 5112000, 'atiku-abubakar': 3834000, 'obi-peter': 1491000, 'sowore-omoyele': 639000, 'undecided-reform': 426000 },
    leadingCandidateId: 'kwankwaso-rabiu',
    topCivicIssue: 'Textile Industry Revival & Commercial Transit'
  },
  {
    stateCode: 'FC',
    stateName: 'Federal Capital Territory (Abuja)',
    zone: 'North Central',
    participants: 9800,
    totalAmountNgn: 14700000,
    candidateVotes: { 'obi-peter': 4704, 'tinubu-bola': 2646, 'atiku-abubakar': 1372, 'kwankwaso-rabiu': 392, 'sowore-omoyele': 490, 'undecided-reform': 196 },
    candidateAmounts: { 'obi-peter': 7056000, 'tinubu-bola': 3969000, 'atiku-abubakar': 2058000, 'kwankwaso-rabiu': 588000, 'sowore-omoyele': 735000, 'undecided-reform': 294000 },
    leadingCandidateId: 'obi-peter',
    topCivicIssue: 'Satellite Town Infrastructure & Civic Inclusivity'
  },
  {
    stateCode: 'RI',
    stateName: 'Rivers',
    zone: 'South South',
    participants: 7600,
    totalAmountNgn: 11400000,
    candidateVotes: { 'obi-peter': 3192, 'tinubu-bola': 2128, 'atiku-abubakar': 1596, 'kwankwaso-rabiu': 228, 'sowore-omoyele': 304, 'undecided-reform': 152 },
    candidateAmounts: { 'obi-peter': 4788000, 'tinubu-bola': 3192000, 'atiku-abubakar': 2394000, 'kwankwaso-rabiu': 342000, 'sowore-omoyele': 456000, 'undecided-reform': 228000 },
    leadingCandidateId: 'obi-peter',
    topCivicIssue: 'Hydrocarbon Transition & Seaport Efficiency'
  },
  {
    stateCode: 'AN',
    stateName: 'Anambra',
    zone: 'South East',
    participants: 7100,
    totalAmountNgn: 10650000,
    candidateVotes: { 'obi-peter': 4615, 'atiku-abubakar': 994, 'tinubu-bola': 852, 'sowore-omoyele': 284, 'kwankwaso-rabiu': 142, 'undecided-reform': 213 },
    candidateAmounts: { 'obi-peter': 6922500, 'atiku-abubakar': 1491000, 'tinubu-bola': 1278000, 'sowore-omoyele': 426000, 'kwankwaso-rabiu': 213000, 'undecided-reform': 319500 },
    leadingCandidateId: 'obi-peter',
    topCivicIssue: 'Industrial Parks & Security Normalisation'
  },
  {
    stateCode: 'OY',
    stateName: 'Oyo',
    zone: 'South West',
    participants: 6800,
    totalAmountNgn: 10200000,
    candidateVotes: { 'tinubu-bola': 3264, 'obi-peter': 2176, 'atiku-abubakar': 680, 'sowore-omoyele': 340, 'kwankwaso-rabiu': 136, 'undecided-reform': 204 },
    candidateAmounts: { 'tinubu-bola': 4896000, 'obi-peter': 3264000, 'atiku-abubakar': 1020000, 'sowore-omoyele': 510000, 'kwankwaso-rabiu': 204000, 'undecided-reform': 306000 },
    leadingCandidateId: 'tinubu-bola',
    topCivicIssue: 'Agribusiness Hub & Ibadan Circular Belt'
  }
];
