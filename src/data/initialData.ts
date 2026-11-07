import { Candidate, StatePollData, PollStats, CharityBeneficiary } from '../types';

export const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: 'obi-peter',
    name: 'Peter Gregory Obi',
    party: 'Nigeria Democratic Congress (NDC)',
    partyAcronym: 'NDC',
    partyColor: '#059669',
    age: 65,
    runningMate: 'Musa Mohammed Rabiu Kwankwaso',
    photoUrl: '/images/candidate_obi_1794056621634.jpg',
    biography: 'Former two-term Governor of Anambra State (2006–2014) and 2023 presidential candidate. Having departed the Labour Party following leadership division, Obi is the official 2027 presidential standard-bearer of the Nigeria Democratic Congress (NDC) on a unified opposition coalition ticket with Rabiu Kwankwaso.',
    experience: [
      '2027 Presidential Flagbearer, Nigeria Democratic Congress (NDC)',
      'Executive Governor of Anambra State (2006–2014)',
      'Former Chairman of Fidelity Bank Plc',
      'Member, Nigerian National Economic Management Team'
    ],
    manifestoPillars: [
      { title: 'Production over Consumption Matrix', description: 'Transforming northern agricultural belts into agro-industrial processing hubs and drastically curtailing the cost of federal governance.' },
      { title: 'Fiscal Transparency & Open Audit', description: 'Consolidating federal ministries, deploying digital open-ledger procurement, and ending deficit sovereign debt traps.' },
      { title: 'Human Capital & Digital Economy Hubs', description: 'Mandatory 15%+ budgetary investment in primary/tertiary education and STEM tech innovation hubs across all 774 LGAs.' }
    ],
    officialWebsite: 'https://peterobi.org',
    verifiedStatus: true,
    votes: 0,
    totalAmountNgn: 0
  },
  {
    id: 'tinubu-bola',
    name: 'Asiwaju Bola Ahmed Tinubu',
    party: 'All Progressives Congress (APC)',
    partyAcronym: 'APC',
    partyColor: '#0284c7',
    age: 74,
    runningMate: 'Kashim Shettima',
    photoUrl: '/images/candidate_tinubu_1794056620399.jpg',
    biography: 'Current President of the Federal Republic of Nigeria and former two-term Governor of Lagos State (1999–2007). Standard-bearer of the ruling All Progressives Congress (APC) seeking continuity of ongoing national fiscal, monetary, and structural reforms.',
    experience: [
      'President of the Federal Republic of Nigeria (2023–Present)',
      'Executive Governor of Lagos State (1999–2007)',
      'Senator for Lagos West Senatorial District (1992–1993)',
      'Senior Executive at Mobil Oil Nigeria'
    ],
    manifestoPillars: [
      { title: 'Economic Modernisation & Tax Harmonisation', description: 'Consolidating national revenue services, single-window port clearance, and expanding credit access to manufacturing MSMEs.' },
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
    party: 'African Democratic Congress (ADC)',
    partyAcronym: 'ADC',
    partyColor: '#dc2626',
    age: 80,
    runningMate: 'Chibuike Rotimi Amaechi',
    photoUrl: '/images/candidate_atiku_1794056621636.jpg',
    biography: 'Former Vice President of the Federal Republic of Nigeria (1999–2007) and veteran industrialist. Philanthropist and founder of the American University of Nigeria, Yola, contesting the 2027 presidency under the African Democratic Congress (ADC) alongside former Rivers Governor and Transport Minister Rotimi Amaechi.',
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
    id: 'sowore-omoyele',
    name: 'Omoyele Sowore',
    party: 'African Action Congress (AAC)',
    partyAcronym: 'AAC',
    partyColor: '#7c3aed',
    age: 55,
    runningMate: 'Haruna Garba Magashi',
    photoUrl: '/images/candidate_sowore_1794057491616.jpg',
    biography: 'Human rights activist, investigative journalist, and founder of Sahara Reporters. Leader of the #RevolutionNow movement advocating for working-class representation, living minimum wages, and radical systemic transformation in Nigerian governance.',
    experience: [
      'Founder and Publisher, Sahara Reporters',
      'President, University of Lagos Student Union Government (1992–1994)',
      'Presidential Candidate, AAC (2019, 2023, 2027)',
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
    id: 'makinde-seyi',
    name: 'Engr. Oluseyi Abiodun Makinde',
    party: 'Allied Peoples Movement (APM)',
    partyAcronym: 'APM',
    partyColor: '#ea580c',
    age: 59,
    runningMate: 'Musa Lawal Daura',
    photoUrl: '/images/candidate_reform_1794057719896.jpg',
    biography: 'Two-term Executive Governor of Oyo State, electrical engineer, and energy entrepreneur. Contesting the 2027 presidency on the Allied Peoples Movement (APM) ticket with northern running mate Musa Lawal Daura, championing sub-national autonomy and technocratic infrastructure delivery.',
    experience: [
      'Executive Governor of Oyo State (2019–Present)',
      'Group Managing Director, Makon Group',
      'Fellow, Nigerian Society of Engineers (FNSE)',
      'Pioneer of Oyo Agribusiness Industrial Hubs'
    ],
    manifestoPillars: [
      { title: 'Sub-National Power & Energy Autonomy', description: 'Enabling all 36 states to build independent power generation networks and energy distribution grids.' },
      { title: 'Agribusiness Corridor Development', description: 'Replicating Oyo agro-industrial processing zones nationwide to feed the nation and boost non-oil export earnings.' },
      { title: 'Technocratic Public Administration', description: 'Reforming civil service compensation and digitizing government procurement for maximum public value.' }
    ],
    verifiedStatus: true,
    votes: 0,
    totalAmountNgn: 0
  },
  {
    id: 'adebayo-adewole',
    name: 'Prince Adewole Ebenezer Adebayo',
    party: 'Social Democratic Party (SDP)',
    partyAcronym: 'SDP',
    partyColor: '#2563eb',
    age: 54,
    runningMate: 'Dr. Usman Muhammed Bugaje',
    photoUrl: '/images/candidate_kwankwaso_1794056621503.jpg',
    biography: 'Constitutional lawyer, international arbitration counsel, and public intellectual. Standard-bearer of the Social Democratic Party (SDP) partnered with distinguished scholar Dr. Usman Bugaje on chapter-two constitutional enforcement and justice.',
    experience: [
      '2023 & 2027 Presidential Candidate, SDP',
      'Principal Partner, Adebayo & Adewole Law Firm',
      'Chairman, KAFTAN TV',
      'Member of the Nigerian Bar and New York Bar'
    ],
    manifestoPillars: [
      { title: 'Constitutional Social Justice & Rights', description: 'Strict enforcement of Chapter II Fundamental Objectives ensuring education, housing, and livelihood for every Nigerian.' },
      { title: 'Judicial Independence & Integrity', description: 'Complete financial autonomy for the judiciary and fast-track anti-graft tribunals.' },
      { title: 'Civic Peace Architecture', description: 'Addressing root socioeconomic grievances driving national insecurity through community equity.' }
    ],
    verifiedStatus: true,
    votes: 0,
    totalAmountNgn: 0
  },
  {
    id: 'okereke-sunday',
    name: 'Sunday Chibuzo Okereke',
    party: 'Labour Party (LP)',
    partyAcronym: 'LP',
    partyColor: '#eab308',
    age: 52,
    runningMate: 'Hajja Bintu Konto',
    photoUrl: '/images/candidate_reform_1794057719896.jpg',
    biography: 'Official 2027 presidential standard-bearer of the Labour Party (LP) following post-2023 party restructuring, running with Borno-born social development advocate Hajja Bintu Konto on labor rights, social democracy, and industrial manufacturing.',
    experience: [
      '2027 Presidential Candidate, Labour Party (LP)',
      'Organised Labour & Trade Union Representative',
      'Civic Industrialisation Strategist',
      'Youth & Workers Welfare Coordinator'
    ],
    manifestoPillars: [
      { title: 'Workers Dignity & Social Security', description: 'Universal pensions, living wage protections, and comprehensive labor health insurance nationwide.' },
      { title: 'Domestic Manufacturing & Import Substitution', description: 'Targeted zero-tariff incentives on industrial machinery for local textile, pharmaceutical, and automotive factories.' },
      { title: 'Public Education Revitalisation', description: 'Modernising federal and state university funding to end strike actions and promote vocational research.' }
    ],
    verifiedStatus: true,
    votes: 0,
    totalAmountNgn: 0
  },
  {
    id: 'onor-sandy',
    name: 'Prof. Sandy Ojang Onor',
    party: 'Peoples Democratic Party (PDP)',
    partyAcronym: 'PDP',
    partyColor: '#16a34a',
    age: 61,
    runningMate: 'Umaru Babangida',
    photoUrl: '/images/candidate_atiku_1794056621636.jpg',
    biography: 'Distinguished academic historian, former Senator representing Cross River Central, and former state commissioner. Official 2027 presidential standard-bearer of the Peoples Democratic Party (PDP) paired with Umaru Babangida.',
    experience: [
      'Senator of the Federal Republic of Nigeria (2019–2023)',
      'Professor of History, University of Calabar',
      'Chairman, Etung Local Government Council',
      'Commissioner for Environment, Cross River State'
    ],
    manifestoPillars: [
      { title: 'Federalist Governance & Regional Balance', description: 'Restoring authentic fiscal federalism and revitalising local council autonomy across all 36 states.' },
      { title: 'Education & Academic Research Funding', description: 'Allocating dedicated resource funds to universities, colleges of education, and polytechnics.' },
      { title: 'Environmental Conservation & Eco-Economy', description: 'Conserving forest reserves and establishing green carbon-credit revenue for frontline states.' }
    ],
    verifiedStatus: true,
    votes: 0,
    totalAmountNgn: 0
  },
  {
    id: 'duke-donald',
    name: 'Donald Duke',
    party: "People's Redemption Party (PRP)",
    partyAcronym: 'PRP',
    partyColor: '#b91c1c',
    age: 65,
    runningMate: 'Kabiru Rabiu',
    photoUrl: '/images/candidate_tinubu_1794056620399.jpg',
    biography: 'Former Executive Governor of Cross River State (1999–2007), widely acclaimed for transforming Calabar into Nigeria’s premier clean tourism destination and pioneering the Tinapa Free Zone. Presidential flagbearer of the People’s Redemption Party (PRP).',
    experience: [
      'Executive Governor of Cross River State (1999–2007)',
      'Pioneer Developer, Tinapa Business Resort & Calabar Carnival',
      'Member, Federal Economic Advisory Council',
      '2019 & 2027 Presidential Flagbearer'
    ],
    manifestoPillars: [
      { title: 'Creative Economy & Global Tourism', description: 'Positioning Nigeria as Africa’s creative, hospitality, and cultural tourism capital to earn foreign exchange.' },
      { title: 'Clean Green Cities & Modern Urban Planning', description: 'Transforming Nigerian municipal centers with sustainable waste management, parks, and light rail transit.' },
      { title: 'Agricultural Value Addition & Cold-Chain Logistics', description: 'Eliminating 40% post-harvest loss through rural cold-storage networks and farmer price guarantees.' }
    ],
    verifiedStatus: true,
    votes: 0,
    totalAmountNgn: 0
  }
];

export const INITIAL_STATS: PollStats = {
  totalVerifiedParticipants: 0,
  totalStatesParticipating: 37,
  totalCandidates: 9,
  totalPoolAmountNgn: 0,
  currentPollLeader: null,
  totalCharityProceedsNgn: 0,
  totalCharityDistributedNgn: 0,
  undistributedFundsNgn: 0,
  lastUpdated: new Date().toISOString(),
  electionTargetDate: 'February 2027',
  isOfficialElection: false,
  disclaimer: 'Nigeria Decides 2027 is an independent civic game for public opinion and charity fundraising. Not affiliated with INEC or the Nigerian Government.'
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
