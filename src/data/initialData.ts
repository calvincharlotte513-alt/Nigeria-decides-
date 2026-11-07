import { Candidate, StatePollData, PollStats, CharityBeneficiary } from '../types';

export const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: 'obi-peter',
    name: 'Peter Gregory Obi',
    party: 'Nigeria Democratic Congress (NDC) / Opposition Coalition',
    partyAcronym: 'NDC',
    partyColor: '#059669',
    age: 65,
    runningMate: 'Rabiu Musa Kwankwaso (Coalition Partner)',
    photoUrl: '/images/candidate_obi_1794056621634.jpg',
    biography: 'Former two-term Governor of Anambra State (2006–2014) and 2023 presidential candidate. Having departed the Labour Party following leadership divisions, Obi stands as the 2027 presidential standard-bearer under the Nigeria Democratic Congress (NDC) within a broad opposition coalition framework.',
    experience: [
      '2027 Presidential Flagbearer, Nigeria Democratic Congress (NDC)',
      'Executive Governor of Anambra State (2006–2014)',
      'Former Chairman of Fidelity Bank Plc',
      'Member, Nigerian National Economic Management Team'
    ],
    manifestoPillars: [
      { title: 'Production over Consumption Paradigm', description: 'Transforming northern agricultural belts into agro-industrial processing hubs and drastically curtailing the cost of federal governance.' },
      { title: 'Fiscal Transparency & Accountability', description: 'Consolidating federal ministries, deploying digital open-ledger procurement, and ending deficit sovereign debt traps.' },
      { title: 'Human Capital & Tech Digital Economy', description: 'Mandatory 15%+ budgetary investment in primary/tertiary education and STEM tech innovation hubs across all 774 LGAs.' }
    ],
    officialWebsite: 'https://peterobi.org',
    verifiedStatus: true,
    votes: 0,
    totalAmountNgn: 0
  },
  {
    id: 'tinubu-bola',
    name: 'Asiwaju Bola Ahmed Tinubu',
    party: 'All Progressives Congress',
    partyAcronym: 'APC',
    partyColor: '#0284c7',
    age: 74,
    runningMate: 'Kashim Shettima',
    photoUrl: '/images/candidate_tinubu_1794056620399.jpg',
    biography: 'Current President of the Federal Republic of Nigeria and former two-term Governor of Lagos State (1999–2007). Longtime leader of the ruling progressive coalition seeking continuity of ongoing national fiscal and structural reforms.',
    experience: [
      'President of the Federal Republic of Nigeria (2023–Present)',
      'Executive Governor of Lagos State (1999–2007)',
      'Senator for Lagos West Senatorial District (1992–1993)',
      'Senior Executive at Mobil Oil Nigeria'
    ],
    manifestoPillars: [
      { title: 'Economic Modernisation & Tax Harmonisation', description: 'Consolidating national revenue services, establishing single-window port clearance, and expanding credit access to manufacturing MSMEs.' },
      { title: 'Strategic Inter-State Infrastructure', description: 'Delivering the Lagos-Calabar Coastal Highway, Sokoto-Badagry expressway corridor, and revitalising the national power grid.' },
      { title: 'Defense Modernisation & Tactical Surveillance', description: 'Deploying intelligence-led aerial surveillance and tactical ground units to safeguard key agricultural belts and borders.' }
    ],
    officialWebsite: 'https://statehouse.gov.ng',
    verifiedStatus: true,
    votes: 0,
    totalAmountNgn: 0
  },
  {
    id: 'atiku-abubakar',
    name: 'Alhaji Atiku Abubakar',
    party: 'Peoples Democratic Party',
    partyAcronym: 'PDP',
    partyColor: '#dc2626',
    age: 80,
    runningMate: 'Ifeanyi Okowa',
    photoUrl: '/images/candidate_atiku_1794056621636.jpg',
    biography: 'Former Vice President of the Federal Republic of Nigeria (1999–2007) and veteran industrialist. Philanthropist and founder of the American University of Nigeria, Yola, championing constitutional restructuring and market deregulation.',
    experience: [
      'Vice President of Nigeria (1999–2007)',
      'Deputy Director, Nigerian Customs Service',
      'Elected Governor of Adamawa State (1998)',
      'Founder, American University of Nigeria (AUN)'
    ],
    manifestoPillars: [
      { title: 'Devolution of Powers & Restructuring', description: 'Reallocating constitutional responsibilities to state governments to unlock regional competitive economic advantages.' },
      { title: 'Private-Sector Driven Industrial Growth', description: 'Attracting $25B in annual diaspora and foreign direct investment through aggressive market-friendly reforms.' },
      { title: 'National Unity & Meritocratic Inclusion', description: 'Enforcing merit-based appointments and broad-based regional inclusivity across all federal commissions and security agencies.' }
    ],
    officialWebsite: 'https://atiku.org',
    verifiedStatus: true,
    votes: 0,
    totalAmountNgn: 0
  },
  {
    id: 'kwankwaso-rabiu',
    name: 'Engr. Rabiu Musa Kwankwaso',
    party: 'New Nigeria Peoples Party (NNPP) / Coalition Partner',
    partyAcronym: 'NNPP',
    partyColor: '#ea580c',
    age: 70,
    runningMate: 'Isaac Idahosa',
    photoUrl: '/images/candidate_kwankwaso_1794056621503.jpg',
    biography: 'Former Governor of Kano State (1999–2003, 2011–2015), former Minister of Defence (2003–2007), and Senator representing Kano Central. Leader of the Kwankwasiyya movement known for mass educational scholarships and grassroots mobilizing.',
    experience: [
      'Executive Governor of Kano State (1999–2003, 2011–2015)',
      'Minister of Defence, Federal Republic of Nigeria (2003–2007)',
      'Senator for Kano Central Senatorial District (2015–2019)',
      'Deputy Speaker, House of Representatives (1992–1993)'
    ],
    manifestoPillars: [
      { title: 'Universal Free Education & Mass Scholarships', description: 'Scaling the tested Kano State educational model nationwide with fully funded overseas scholarships and STEM focus.' },
      { title: 'Artisanal & Technical Youth Employment', description: 'Direct vocational academies and seed micro-capital grants for young graduates in industrial and vocational trades.' },
      { title: 'Community Policing & Border Defense', description: 'Strengthening community-based defense frameworks and modernizing equipment for the Nigerian armed forces.' }
    ],
    officialWebsite: 'https://kwankwasiyya.org',
    verifiedStatus: true,
    votes: 0,
    totalAmountNgn: 0
  },
  {
    id: 'sowore-omoyele',
    name: 'Omoyele Sowore',
    party: 'African Action Congress',
    partyAcronym: 'AAC',
    partyColor: '#7c3aed',
    age: 55,
    runningMate: 'Haruna Garba Magashi',
    photoUrl: '/images/candidate_sowore_1794057491616.jpg',
    biography: 'Human rights activist, investigative journalist, and founder of Sahara Reporters. Leader of the #RevolutionNow movement advocating for working-class representation and radical systemic transformation in Nigerian governance.',
    experience: [
      'Founder and Publisher, Sahara Reporters',
      'President, University of Lagos Student Union Government (1992–1994)',
      'Presidential Candidate, AAC (2019, 2023)',
      'International Civic Rights Advocate'
    ],
    manifestoPillars: [
      { title: 'Systemic Anti-Corruption & Public Asset Recovery', description: 'Immediate repatriation of stolen public wealth, cancellation of predatory sovereign loans, and public salary equality.' },
      { title: 'Living Minimum Wage (₦250k+)', description: 'Indexing national minimum wage directly to verifiable real-world cost-of-living metrics and monthly inflation rates.' },
      { title: 'Universal Free Healthcare & Social Housing', description: 'Building state-funded housing blocks across all major industrial centres and guaranteed free primary healthcare for all.' }
    ],
    officialWebsite: 'https://aacparty.org',
    verifiedStatus: true,
    votes: 0,
    totalAmountNgn: 0
  },
  {
    id: 'undecided-reform',
    name: 'Prof. Christopher Imumolen & Youth Coalition',
    party: 'Accord / Independent Youth Reform Coalition',
    partyAcronym: 'A/ADC',
    partyColor: '#d97706',
    age: 44,
    runningMate: 'Balarabe Rufai',
    photoUrl: '/images/candidate_reform_1794057719896.jpg',
    biography: 'Academic, industrial tech entrepreneur, and youth empowerment advocate. Representing independent progressive reform, educational tech digitization, and technocratic public administration for the next generation.',
    experience: [
      'Civic Society Representation',
      'Technocratic & Policy Think-Tank Consensus',
      'Youth & Diaspora Innovation Coalition'
    ],
    manifestoPillars: [
      { title: 'Digital Governance & Electoral Integrity', description: 'Comprehensive digital public administration, real-time public accounting, and independent judicial funding.' },
      { title: 'Decentralized Clean Solar Microgrids', description: 'Installing reliable clean power generation across 10,000 rural communities within 36 months.' },
      { title: 'Open Public Data & Revenue Ledger', description: 'Mandatory real-time public access to all federal contract allocations, petroleum subsidies, and sovereign loans.' }
    ],
    verifiedStatus: true,
    votes: 0,
    totalAmountNgn: 0
  }
];

export const INITIAL_STATS: PollStats = {
  totalVerifiedParticipants: 0,
  totalPoolAmountNgn: 0,
  currentPollLeader: null,
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
    allocatedAmountNgn: 0,
    disbursedAmountNgn: 0,
    lastDisbursementDate: 'Pending first game distribution cycle',
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
    allocatedAmountNgn: 0,
    disbursedAmountNgn: 0,
    lastDisbursementDate: 'Pending first game distribution cycle',
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
    allocatedAmountNgn: 0,
    disbursedAmountNgn: 0,
    lastDisbursementDate: 'Pending first game distribution cycle',
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
    allocatedAmountNgn: 0,
    disbursedAmountNgn: 0,
    lastDisbursementDate: 'Pending first game distribution cycle',
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
    allocatedAmountNgn: 0,
    disbursedAmountNgn: 0,
    lastDisbursementDate: 'Pending first game distribution cycle',
    proofDocumentUrl: 'https://kanoyouthcare.org/audit'
  }
];

export const INITIAL_STATES: StatePollData[] = [
  { stateCode: 'AB', stateName: 'Abia', zone: 'South East', participants: 0, totalAmountNgn: 0, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: '', topCivicIssue: 'Commercial Infrastructure & Aba Road Corridors' },
  { stateCode: 'AD', stateName: 'Adamawa', zone: 'North East', participants: 0, totalAmountNgn: 0, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: '', topCivicIssue: 'Border Trade & Agricultural Irrigation' },
  { stateCode: 'AK', stateName: 'Akwa Ibom', zone: 'South South', participants: 0, totalAmountNgn: 0, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: '', topCivicIssue: 'Deep Sea Port & Industrial Employment' },
  { stateCode: 'AN', stateName: 'Anambra', zone: 'South East', participants: 0, totalAmountNgn: 0, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: '', topCivicIssue: 'Industrial Parks & Security Normalisation' },
  { stateCode: 'BA', stateName: 'Bauchi', zone: 'North East', participants: 0, totalAmountNgn: 0, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: '', topCivicIssue: 'Primary Healthcare & Pastoral Support' },
  { stateCode: 'BY', stateName: 'Bayelsa', zone: 'South South', participants: 0, totalAmountNgn: 0, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: '', topCivicIssue: 'Environmental Remediation & Marine Economy' },
  { stateCode: 'BE', stateName: 'Benue', zone: 'North Central', participants: 0, totalAmountNgn: 0, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: '', topCivicIssue: 'Food Basket Security & Agro-Processing' },
  { stateCode: 'BO', stateName: 'Borno', zone: 'North East', participants: 0, totalAmountNgn: 0, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: '', topCivicIssue: 'Post-Conflict Reconstruction & Chad Basin Commerce' },
  { stateCode: 'CR', stateName: 'Cross River', zone: 'South South', participants: 0, totalAmountNgn: 0, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: '', topCivicIssue: 'Eco-Tourism & Cross-Border Logistics' },
  { stateCode: 'DE', stateName: 'Delta', zone: 'South South', participants: 0, totalAmountNgn: 0, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: '', topCivicIssue: 'Host Community Development & Gas Flaring Curb' },
  { stateCode: 'EB', stateName: 'Ebonyi', zone: 'South East', participants: 0, totalAmountNgn: 0, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: '', topCivicIssue: 'Rice Milling & Mining Safety' },
  { stateCode: 'ED', stateName: 'Edo', zone: 'South South', participants: 0, totalAmountNgn: 0, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: '', topCivicIssue: 'Tech Ecosystem & Vocational Apprenticeships' },
  { stateCode: 'EK', stateName: 'Ekiti', zone: 'South West', participants: 0, totalAmountNgn: 0, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: '', topCivicIssue: 'Knowledge Economy & Agricultural Tech' },
  { stateCode: 'EN', stateName: 'Enugu', zone: 'South East', participants: 0, totalAmountNgn: 0, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: '', topCivicIssue: 'Water Supply & Regional Aviation Hub' },
  { stateCode: 'FC', stateName: 'Federal Capital Territory (Abuja)', zone: 'North Central', participants: 0, totalAmountNgn: 0, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: '', topCivicIssue: 'Satellite Town Infrastructure & Civic Inclusivity' },
  { stateCode: 'GO', stateName: 'Gombe', zone: 'North East', participants: 0, totalAmountNgn: 0, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: '', topCivicIssue: 'Logistics Center & Dry Port Development' },
  { stateCode: 'IM', stateName: 'Imo', zone: 'South East', participants: 0, totalAmountNgn: 0, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: '', topCivicIssue: 'Digital Jobs & Youth Security Restitution' },
  { stateCode: 'JI', stateName: 'Jigawa', zone: 'North West', participants: 0, totalAmountNgn: 0, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: '', topCivicIssue: 'Solar Irrigation & Sesame/Wheat Value Chain' },
  { stateCode: 'KD', stateName: 'Kaduna', zone: 'North West', participants: 0, totalAmountNgn: 0, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: '', topCivicIssue: 'Railway Modernisation & Educational Hub' },
  { stateCode: 'KN', stateName: 'Kano', zone: 'North West', participants: 0, totalAmountNgn: 0, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: '', topCivicIssue: 'Textile Industry Revival & Commercial Transit' },
  { stateCode: 'KT', stateName: 'Katsina', zone: 'North West', participants: 0, totalAmountNgn: 0, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: '', topCivicIssue: 'Border Surveillance & Renewable Energy' },
  { stateCode: 'KE', stateName: 'Kebbi', zone: 'North West', participants: 0, totalAmountNgn: 0, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: '', topCivicIssue: 'Anchor Borrowers Continuity & Cross-Border Rice Trade' },
  { stateCode: 'KO', stateName: 'Kogi', zone: 'North Central', participants: 0, totalAmountNgn: 0, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: '', topCivicIssue: 'Ajaokuta Steel Activation & Confluence Tourism' },
  { stateCode: 'KW', stateName: 'Kwara', zone: 'North Central', participants: 0, totalAmountNgn: 0, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: '', topCivicIssue: 'Agro-Allied Cargo Terminal & Light Manufacturing' },
  { stateCode: 'LA', stateName: 'Lagos', zone: 'South West', participants: 0, totalAmountNgn: 0, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: '', topCivicIssue: 'Mass Transit Multimodal & Digital Creative Economy' },
  { stateCode: 'NA', stateName: 'Nasarawa', zone: 'North Central', participants: 0, totalAmountNgn: 0, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: '', topCivicIssue: 'Solid Mineral Extraction & Abuja Corridor Living' },
  { stateCode: 'NI', stateName: 'Niger', zone: 'North Central', participants: 0, totalAmountNgn: 0, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: '', topCivicIssue: 'Hydroelectric Host Compensation & Farmland Security' },
  { stateCode: 'OG', stateName: 'Ogun', zone: 'South West', participants: 0, totalAmountNgn: 0, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: '', topCivicIssue: 'Industrial Zone Infrastructure & Road Interlinks' },
  { stateCode: 'ON', stateName: 'Ondo', zone: 'South West', participants: 0, totalAmountNgn: 0, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: '', topCivicIssue: 'Bitumen Exploitation & Coastal Port Connectivity' },
  { stateCode: 'OS', stateName: 'Osun', zone: 'South West', participants: 0, totalAmountNgn: 0, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: '', topCivicIssue: 'Mining Formalisation & Cultural Tourism' },
  { stateCode: 'OY', stateName: 'Oyo', zone: 'South West', participants: 0, totalAmountNgn: 0, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: '', topCivicIssue: 'Agribusiness Hub & Ibadan Circular Belt' },
  { stateCode: 'PL', stateName: 'Plateau', zone: 'North Central', participants: 0, totalAmountNgn: 0, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: '', topCivicIssue: 'Peace Architecture & Temperate Horticulture' },
  { stateCode: 'RI', stateName: 'Rivers', zone: 'South South', participants: 0, totalAmountNgn: 0, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: '', topCivicIssue: 'Hydrocarbon Transition & Seaport Efficiency' },
  { stateCode: 'SO', stateName: 'Sokoto', zone: 'North West', participants: 0, totalAmountNgn: 0, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: '', topCivicIssue: 'Desertification Buffer & Cement Manufacturing' },
  { stateCode: 'TA', stateName: 'Taraba', zone: 'North East', participants: 0, totalAmountNgn: 0, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: '', topCivicIssue: 'Mambilla Hydro Project & Tea/Coffee Farming' },
  { stateCode: 'YO', stateName: 'Yobe', zone: 'North East', participants: 0, totalAmountNgn: 0, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: '', topCivicIssue: 'Gum Arabic Processing & Nomadic Education' },
  { stateCode: 'ZA', stateName: 'Zamfara', zone: 'North West', participants: 0, totalAmountNgn: 0, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: '', topCivicIssue: 'Artisanal Gold Regulation & Rural Peace Enforcement' }
];
