import { Candidate, StatePollData, PollStats, CharityBeneficiary } from '../types';

export const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: 'tinubu-bola',
    name: 'Bola Ahmed Tinubu',
    party: 'All Progressives Congress',
    partyAcronym: 'APC',
    partyColor: '#0284c7', // Sky Blue
    age: 74,
    runningMate: 'Kashim Shettima',
    photoUrl: '/images/candidate_tinubu_1794056620399.jpg',
    biography: 'Current President of the Federal Republic of Nigeria and former two-term Governor of Lagos State (1999–2007). Leader in progressive economic reforms and fiscal modernization.',
    experience: [
      'President of the Federal Republic of Nigeria (2023–Present)',
      'Executive Governor of Lagos State (1999–2007)',
      'Senator for Lagos West Senatorial District (1992–1993)',
      'Senior Executive at Mobil Oil Nigeria'
    ],
    manifestoPillars: [
      { title: 'Renewed Hope Economic Modernisation', description: 'Expanding non-oil revenues, digital tax transformation, and single-window maritime port trade.' },
      { title: 'Strategic Coastal & Trans-Sahara Corridors', description: 'Fast-tracking Lagos-Calabar Coastal Highway and Sokoto-Badagry expressway networks.' },
      { title: 'Security Modernisation & Counter-Terrorism', description: 'High-tech drone surveillance, regional joint security commands, and tactical troop equipping.' }
    ],
    officialWebsite: 'https://statehouse.gov.ng',
    verifiedStatus: true,
    votes: 38420,
    totalAmountNgn: 59200000
  },
  {
    id: 'atiku-abubakar',
    name: 'Atiku Abubakar',
    party: 'African Democratic Congress',
    partyAcronym: 'ADC',
    partyColor: '#16a34a', // Emerald green
    age: 80,
    runningMate: 'Rotimi Amaechi',
    photoUrl: '/images/candidate_atiku_1794056621636.jpg',
    biography: 'Former Vice President of the Federal Republic of Nigeria (1999–2007), veteran statesman, industrialist, and founder of the American University of Nigeria, Yola.',
    experience: [
      'Vice President of Nigeria (1999–2007)',
      'Deputy Director, Nigerian Customs Service',
      'Elected Governor of Adamawa State (1998)',
      'Founder, American University of Nigeria (AUN)'
    ],
    manifestoPillars: [
      { title: 'Restructuring & True Devolution', description: 'Transferring resource control and key infrastructural powers to subnational state governments.' },
      { title: 'Private Sector-Led National Renaissance', description: 'Unlocking $30B foreign direct investment and aggressive deregulation of energy monopolies.' },
      { title: 'National Unity & Meritocratic Governance', description: 'Enforcing balanced federal character appointments with transparent public governance.' }
    ],
    officialWebsite: 'https://atiku.org',
    verifiedStatus: true,
    votes: 34120,
    totalAmountNgn: 51200000
  },
  {
    id: 'obi-peter',
    name: 'Peter Obi',
    party: 'National Democratic Coalition',
    partyAcronym: 'NDC',
    partyColor: '#059669', // Deep green
    age: 65,
    runningMate: 'Rabiu Kwankwaso',
    photoUrl: '/images/candidate_obi_1794056621634.jpg',
    biography: 'Former two-term Governor of Anambra State (2006–2014) and presidential candidate. Celebrated for fiscal discipline, education investment, and youth civic mobilization.',
    experience: [
      'Executive Governor of Anambra State (2006–2014)',
      'Former Chairman of Fidelity Bank Plc',
      'Member, Nigerian National Economic Management Team',
      'Chairman, South-East Governors Forum'
    ],
    manifestoPillars: [
      { title: 'Consumption to Production Pivot', description: 'Targeted agricultural industrialization across the expansive northern agricultural belt.' },
      { title: 'Cost of Governance Drastic Reduction', description: 'Eliminating duplicate federal agencies and enforcing real-time budget public expenditure tracking.' },
      { title: 'Human Capital & Digital Skills', description: 'Allocating 15%+ federal budget to tech literacy, basic education, and healthcare.' }
    ],
    officialWebsite: 'https://peterobi.org',
    verifiedStatus: true,
    votes: 42150,
    totalAmountNgn: 64800000
  },
  {
    id: 'okereke-sunday',
    name: 'Sunday Chibuzo Okereke',
    party: 'Labour Party',
    partyAcronym: 'LP',
    partyColor: '#dc2626', // Red
    age: 52,
    runningMate: 'Hajja Bintu Konto',
    photoUrl: '/images/candidate_sunday_okereke_1794127739692.jpg',
    biography: 'Organized labour stalwart, grassroots civic organizer, and economic inclusion advocate championing workers rights, living wages, and industrial revival across Nigeria.',
    experience: [
      'Senior Advisor, Organized Trade Union Policy Directorate',
      'Coordinator, National Youth Apprenticeship & Artisanal Network',
      'Fellow, Nigerian Institute of Industrial Relations'
    ],
    manifestoPillars: [
      { title: 'Decent Living Wage Framework', description: 'Establishing cost-of-living indexed statutory minimum compensation for all Nigerian working citizens.' },
      { title: 'Re-Industrialization & Manufacturing Hubs', description: 'Affordable concessionary single-digit loans for local manufacturers and agro-allied processors.' },
      { title: 'Social Security & Universal Healthcare', description: 'Comprehensive primary healthcare protection for informal workers and elderly citizens.' }
    ],
    officialWebsite: 'https://labourparty.com.ng',
    verifiedStatus: true,
    votes: 21450,
    totalAmountNgn: 32600000
  },
  {
    id: 'onor-sandy',
    name: 'Sandy Ojang Onor',
    party: 'Peoples Democratic Party',
    partyAcronym: 'PDP',
    partyColor: '#b91c1c', // Crimson Red
    age: 58,
    runningMate: 'Umaru Babangida',
    photoUrl: '/images/candidate_sandy_onor_1794127726209.jpg',
    biography: 'Distinguished Professor of History, former Senator representing Cross River Central, and former Commissioner. Renowned for constitutional erudition and legislative excellence.',
    experience: [
      'Senator of the Federal Republic of Nigeria (2019–2023)',
      'Professor of African History and Strategic Studies',
      'Honourable Commissioner for Environment & Agriculture, Cross River',
      'Local Government Council Executive Chairman'
    ],
    manifestoPillars: [
      { title: 'Constitutional Reforms & Regional Autonomy', description: 'Revising exclusive legislative lists to liberate sub-national state economic potential.' },
      { title: 'Education & Higher Institution Revitalization', description: 'Modernising federal university funding and fostering global research partnerships.' },
      { title: 'Eco-Tourism & Blue Economy Development', description: 'Capitalising on maritime, riverine, and ecological assets for sustainable employment.' }
    ],
    officialWebsite: 'https://sandyonor.ng',
    verifiedStatus: true,
    votes: 27800,
    totalAmountNgn: 41200000
  },
  {
    id: 'omoaje-rufai',
    name: 'Rufai Adekunle Omo-Aje',
    party: 'Action Alliance',
    partyAcronym: 'AA',
    partyColor: '#4f46e5', // Indigo
    age: 62,
    runningMate: 'Shehu Hussaini',
    photoUrl: '/images/candidate_rufai_omoaje_1794127805780.jpg',
    biography: 'National political leader, grassroots coalition organizer, and champion of electoral integrity and equal political participation for all Nigerian demographic strata.',
    experience: [
      'National Chairman and Leader, Action Alliance (AA)',
      'Co-Convener, Inter-Party Civic Consultative Forum',
      'Veteran Grassroots Political Strategist across South West & North Central'
    ],
    manifestoPillars: [
      { title: 'Agricultural Mechanization at Scale', description: 'Providing 50,000 tractors and solar cold-chain storage facilities to agrarian clusters.' },
      { title: 'Civic Re-Orientation & Ethics', description: 'Rebuilding patriotic national values, transparency, and anti-corruption compliance.' },
      { title: 'Rural Electrification & Clean Water', description: 'Accelerating off-grid solar micro-utilities across 8,000 rural communities.' }
    ],
    officialWebsite: 'https://actionalliance.org.ng',
    verifiedStatus: true,
    votes: 14850,
    totalAmountNgn: 21900000
  },
  {
    id: 'aliyu-abbas',
    name: 'Abbas-Bin Aliyu',
    party: 'Action Democratic Party',
    partyAcronym: 'ADP',
    partyColor: '#2563eb', // Royal Blue
    age: 64,
    runningMate: 'Ike Chinazam',
    photoUrl: '/images/candidate_abbas_aliyu_1794127818433.jpg',
    biography: 'Seasoned technocrat, administrator, and commercial innovator dedicated to participatory democracy, fiscal transparency, and modern public sector administration.',
    experience: [
      'Senior Federal Civil Service Director (Rtd)',
      'National Executive Leader, Action Democratic Party',
      'Public Financial Management Policy Specialist'
    ],
    manifestoPillars: [
      { title: 'Participatory Democratic Governance', description: 'Digital public feedback systems for all major capital project procurement.' },
      { title: 'Small Business Tax Holidays & Incubators', description: 'Zero tax for micro-enterprises earning under ₦25M annual turnover.' },
      { title: 'Integrated Inter-Modal Transportation', description: 'Standard gauge rail links connecting northern agricultural belts to southern ports.' }
    ],
    officialWebsite: 'https://adp.ng',
    verifiedStatus: true,
    votes: 16200,
    totalAmountNgn: 24300000
  },
  {
    id: 'kabiru-yusuf',
    name: 'Yusuf Kabiru',
    party: 'Action Peoples Party',
    partyAcronym: 'APP',
    partyColor: '#0d9488', // Teal
    age: 48,
    runningMate: 'Peace Egobia',
    photoUrl: '/images/candidate_yusuf_kabiru_1794127831145.jpg',
    biography: 'Economist, international development consultant, and youth economic inclusion pioneer focused on green industrialization and regional cross-border commerce.',
    experience: [
      'Lead Economic Consultant, West African Development Advisory',
      'Pioneer Fellow, Pan-African Youth Leadership Assembly',
      'Advisor on Sub-National Budgetary Efficiency'
    ],
    manifestoPillars: [
      { title: 'Green Industrialization Strategy', description: 'Deploying renewable mini-grids to power 50 industrial clusters across the nation.' },
      { title: 'Youth Sovereign Innovation Fund', description: 'A $1B revolving fund for Nigerian software developers, biotech, and creative startups.' },
      { title: 'Border Community Trade Liberalization', description: 'Eliminating non-tariff trade barriers under the African Continental Free Trade Area (AfCFTA).' }
    ],
    officialWebsite: 'https://appnigeria.org',
    verifiedStatus: true,
    votes: 15300,
    totalAmountNgn: 22800000
  },
  {
    id: 'sowore-omoyele',
    name: 'Omoyele Sowore',
    party: 'African Action Congress',
    partyAcronym: 'AAC',
    partyColor: '#7c3aed', // Purple
    age: 55,
    runningMate: 'Haruna Garba Magashi',
    photoUrl: '/images/candidate_sowore_1794057491616.jpg',
    biography: 'Human rights activist, investigative journalist, and founder of Sahara Reporters. Leader of the #RevolutionNow movement advocating for transformative governance.',
    experience: [
      'Founder and Publisher, Sahara Reporters',
      'President, University of Lagos Student Union Government (1992–1994)',
      'Presidential Candidate, AAC (2019, 2023)',
      'International Civic Rights Advocate'
    ],
    manifestoPillars: [
      { title: 'Radical Anti-Corruption & Wealth Recovery', description: 'Immediate repatriation of illicit capital, abolishing security votes, and public sector wage parity.' },
      { title: 'Living Wage & Worker Dignity', description: 'Statutory living wage indexed to inflation for all public and private employees.' },
      { title: 'Free Universal Quality Healthcare & Education', description: 'Tuition-free tertiary schooling and state-funded clinics across all 774 LGAs.' }
    ],
    officialWebsite: 'https://aacparty.org',
    verifiedStatus: true,
    votes: 18400,
    totalAmountNgn: 27500000
  },
  {
    id: 'makinde-seyi',
    name: 'Oluseyi Abiodun Makinde',
    party: 'Allied Peoples Movement',
    partyAcronym: 'APM',
    partyColor: '#ea580c', // Orange
    age: 58,
    runningMate: 'Musa Lawal Daura',
    photoUrl: '/images/candidate_seyi_makinde_1794127702253.jpg',
    biography: 'Executive Governor of Oyo State, electrical engineer, and energy entrepreneur known for landmark infrastructural delivery, prompt civil service payments, and educational reforms.',
    experience: [
      'Executive Governor of Oyo State (2019–Present)',
      'Group Managing Director, Makon Group',
      'Member, Council for the Regulation of Engineering in Nigeria (COREN)',
      'Philanthropist and Education Endowment Benefactor'
    ],
    manifestoPillars: [
      { title: 'Infrastructure for Economic Expansion', description: 'Circular highway belts, dry port multimodal connectivity, and regional grid independence.' },
      { title: 'Agribusiness Hub Integration', description: 'Transforming agricultural farm settlements into export processing zones.' },
      { title: 'Civil Service Modernization & Prompt Welfare', description: 'Guaranteed 13th-month pensions, performance-based promotions, and digital governance.' }
    ],
    officialWebsite: 'https://seyimakinde.com',
    verifiedStatus: true,
    votes: 36900,
    totalAmountNgn: 56400000
  },
  {
    id: 'adenuga-sunday',
    name: 'Sunday Adenuga',
    party: 'Boot Party',
    partyAcronym: 'BP',
    partyColor: '#9333ea', // Deep Purple
    age: 56,
    runningMate: 'Usman Turaki Mustapha',
    photoUrl: '/images/candidate_sunday_adenuga_1794127844612.jpg',
    biography: 'Business executive, industrial tech pioneer, and innovator advocating for digital voting modernisation, blockchain governance, and technical vocational schooling.',
    experience: [
      'Founder and National Leader, Boot Party (BP)',
      'Chief Executive, Enterprise IT & FinTech Solutions',
      'Fellow, Nigerian Computer Society'
    ],
    manifestoPillars: [
      { title: 'Electoral & Civic Digitalisation', description: 'Full biometric e-voting, open blockchain budget oversight, and mobile citizen participation.' },
      { title: 'Technical & Coding Hubs in 774 LGAs', description: 'Equipping 5 million youth with artificial intelligence, cloud, and mechanical engineering skills.' },
      { title: 'Start-Up Incubation Tax Holidays', description: '5-year corporate tax exemptions for indigenous tech and manufacturing start-ups.' }
    ],
    officialWebsite: 'https://bootparty.ng',
    verifiedStatus: true,
    votes: 11400,
    totalAmountNgn: 17100000
  },
  {
    id: 'adebisi-moses',
    name: 'Moses Olusoji Adebisi',
    party: 'Democratic Leadership Alliance',
    partyAcronym: 'DLA',
    partyColor: '#c026d3', // Magenta
    age: 54,
    runningMate: 'Nafisat Usaku Abubakar',
    photoUrl: '/images/candidate_moses_adebisi_1794127857859.jpg',
    biography: 'Community leader, public policy scholar, and civil society reformer passionate about grassroots decentralization, environmental remediation, and judicial accountability.',
    experience: [
      'National Chairman, Democratic Leadership Alliance',
      'Senior Research Fellow in Governance and Public Law',
      'Executive Director, Coalition for Accountable Democracy'
    ],
    manifestoPillars: [
      { title: 'Judicial Autonomy & Speedy Justice', description: 'Independent funding for judiciary and digital court recording to resolve commercial disputes within 90 days.' },
      { title: 'Grassroots Fiscal Autonomy', description: 'Direct federal revenue allocation to local government councils with community audit committees.' },
      { title: 'Renewable Power Cooperatives', description: 'Subsidized community solar plants owned and managed by local market associations.' }
    ],
    officialWebsite: 'https://dla.org.ng',
    verifiedStatus: true,
    votes: 10800,
    totalAmountNgn: 16200000
  },
  {
    id: 'okwori-ada',
    name: 'Ada Elizabeth Fredrick Okwori',
    party: 'National Democratic Party',
    partyAcronym: 'NDP',
    partyColor: '#e11d48', // Rose Red
    age: 46,
    runningMate: 'Uchenna Anthony Chukwuemeka',
    photoUrl: '/images/candidate_ada_okwori_1794127767446.jpg',
    biography: 'Legal luminary, human rights advocate, and gender equity pioneer fighting for female economic empowerment, maternal healthcare, and child protection statutes.',
    experience: [
      'Principal Partner, Apex Chambers Abuja',
      'Former National Legal Advisor & Civic Rights Litigator',
      'Trustee, Foundation for Maternal and Child Health Nigeria'
    ],
    manifestoPillars: [
      { title: '35%+ Affirmative Action & Equal Rights', description: 'Constitutional guarantee of 35% female cabinet and legislative representation.' },
      { title: 'Free Universal Maternal & Pediatric Care', description: 'Zero fees for prenatal delivery, infant immunizations, and pediatric care nationwide.' },
      { title: 'Micro-Credit for Market Women', description: 'Zero-collateral ₦500,000 working capital loans for registered market cooperatives.' }
    ],
    officialWebsite: 'https://ndp.org.ng',
    verifiedStatus: true,
    votes: 14200,
    totalAmountNgn: 21300000
  },
  {
    id: 'okereke-nkem',
    name: 'Nkem Esther Okereke',
    party: 'National Rescue Movement',
    partyAcronym: 'NRM',
    partyColor: '#047857', // Forest Green
    age: 49,
    runningMate: 'Nasir Muhammed Sulaiman',
    photoUrl: '/images/candidate_nkem_okereke_1794127781051.jpg',
    biography: 'International development specialist, financial analyst, and civic activist dedicated to ethical governance, national debt auditing, and food security.',
    experience: [
      'Senior Financial Analyst, African Development Banking Initiatives',
      'National Woman Leader, Coalition for Democratic Rescue',
      'Consultant to USAID and DFID Governance Frameworks'
    ],
    manifestoPillars: [
      { title: 'National Debt Forensic Audit', description: 'Auditing all sovereign external and domestic debts and renegotiating predatory loan terms.' },
      { title: 'National Food Reserve & Price Stabilization', description: 'Strategic grains reserves in every state to cushion inflation on staple foodstuffs.' },
      { title: 'Clean Water in Every Ward', description: 'Solar motorized boreholes and water filtration plants across all 9,555 electoral wards.' }
    ],
    officialWebsite: 'https://nrm.org.ng',
    verifiedStatus: true,
    votes: 13900,
    totalAmountNgn: 20850000
  },
  {
    id: 'duke-donald',
    name: 'Donald Duke',
    party: 'Peoples Redemption Party',
    partyAcronym: 'PRP',
    partyColor: '#d97706', // Amber Gold
    age: 65,
    runningMate: 'Kabiru Rabiu',
    photoUrl: '/images/candidate_donald_duke_1794127686955.jpg',
    biography: 'Former two-term Governor of Cross River State (1999–2007), architect of the Tinapa Business Resort, Obudu Mountain Resort, and Calabar Carnival. Legendary pioneer of Nigerian tourism and eco-development.',
    experience: [
      'Executive Governor of Cross River State (1999–2007)',
      'Presidential Candidate (2019)',
      'Commissioner for Finance, Budget and Planning',
      'Chairman, Allied Energy Plc'
    ],
    manifestoPillars: [
      { title: 'Tourism & Creative Economy Superpower', description: 'Generating $15B annual foreign exchange via cultural tourism, film, and destination resorts.' },
      { title: 'Urban Renewal & Environmental Sustainability', description: 'Replicating Calabar cleanliness and green city master plans across all state capitals.' },
      { title: 'Fiscal Modernisation & Private Investment', description: 'Transforming Nigeria into Africa’s premier financial hub with streamlined corporate registration.' }
    ],
    officialWebsite: 'https://donaldduke.ng',
    verifiedStatus: true,
    votes: 31200,
    totalAmountNgn: 47800000
  },
  {
    id: 'adebayo-adewole',
    name: 'Adewole Ebenezer Adebayo',
    party: 'Social Democratic Party',
    partyAcronym: 'SDP',
    partyColor: '#4338ca', // Indigo Blue
    age: 54,
    runningMate: 'Usman Muhammed Bugaje',
    photoUrl: '/images/candidate_adewole_adebayo_1794127714406.jpg',
    biography: 'Distinguished international lawyer, media proprietor (KAFTAN TV), and 2023 SDP Presidential Candidate. Champion of Chapter 2 constitutional socio-economic fundamental objectives.',
    experience: [
      'Presidential Candidate, Social Democratic Party (2023)',
      'Founder and Chairman, KAFTAN Television Worldwide',
      'Member of Nigerian and California Bars, USA',
      'Philanthropist and Primary Healthcare Sponsor'
    ],
    manifestoPillars: [
      { title: 'Constitutional Socio-Economic Rights Enforcement', description: 'Making housing, employment, and healthcare legally enforceable rights under Chapter 2.' },
      { title: 'Eliminating Extreme Poverty in 4 Years', description: 'Guaranteed social dividend transfers to the poorest 20 million Nigerian households.' },
      { title: 'Zero Tolerance for Insecurity & Kidnapping', description: 'Equipping police and state security with advanced satellite tracking and forensic capabilities.' }
    ],
    officialWebsite: 'https://adewoleadebayo.com',
    verifiedStatus: true,
    votes: 24600,
    totalAmountNgn: 36900000
  },
  {
    id: 'agada-peter',
    name: 'Peter Ada Agada',
    party: 'Young Progressives Party',
    partyAcronym: 'YPP',
    partyColor: '#0891b2', // Cyan
    age: 45,
    runningMate: 'Patience Ndidi Key',
    photoUrl: '/images/candidate_peter_agada_1794127792565.jpg',
    biography: 'Tech venture capitalist, youth advocate, and industrial systems architect driving disruptive digital government services and renewable energy adoption.',
    experience: [
      'Managing Partner, African Venture Technology Capital',
      'National Youth Policy Lead, Young Progressives Party',
      'Mentor, National Directorate of Employment (NDE) Innovators'
    ],
    manifestoPillars: [
      { title: 'Digital Sovereign Economy', description: 'Digitising all public procurement and tax collections to eliminate 95% of administrative leakage.' },
      { title: 'Venture Capital Matching Grants for Youth', description: '₦500B federal matching fund for young technology, creative, and manufacturing entrepreneurs.' },
      { title: 'Universal Broadband & Solar in All Schools', description: 'High-speed satellite internet and 24/7 solar electrification in all public primary and secondary schools.' }
    ],
    officialWebsite: 'https://ypp.ng',
    verifiedStatus: true,
    votes: 19800,
    totalAmountNgn: 29700000
  },
  {
    id: 'nwanyanwu-daniel',
    name: 'Daniel Daberechukwu Nwanyanwu',
    party: 'Zenith Labour Party',
    partyAcronym: 'ZLP',
    partyColor: '#16a34a', // Bright Green
    age: 66,
    runningMate: 'Hassan Khalid',
    photoUrl: '/images/candidate_daniel_nwanyanwu_1794127753298.jpg',
    biography: 'Veteran trade unionist, lawyer, former National Chairman of the Labour Party, and National Chairman and Presidential Candidate of the Zenith Labour Party.',
    experience: [
      'National Chairman and Presidential Candidate, Zenith Labour Party',
      'Former National Chairman, Labour Party (2004–2014)',
      'President, National Union of Banks, Insurance and Financial Institutions Employees (NUBIFIE)',
      'Member, 2014 National Constitutional Conference'
    ],
    manifestoPillars: [
      { title: 'Workers First Industrial Policy', description: 'Re-opening dormant manufacturing plants, textile mills, and automobile assembly hubs.' },
      { title: 'Pensioner Dignity & Immediate Payouts', description: 'Digital biometrics for instant retirement payouts and zero queueing for elderly pensioners.' },
      { title: 'Affordable Social Housing Construction', description: 'State-backed 30-year fixed single-digit mortgage housing estates across all 36 state capitals.' }
    ],
    officialWebsite: 'https://zlp.org.ng',
    verifiedStatus: true,
    votes: 21900,
    totalAmountNgn: 33200000
  }
];

export const INITIAL_STATS: PollStats = {
  totalVerifiedParticipants: 387490,
  totalStatesParticipating: 37,
  totalCandidates: 18,
  totalPoolAmountNgn: 587450000,
  currentPollLeader: INITIAL_CANDIDATES[2], // Peter Obi
  totalCharityProceedsNgn: 587450000,
  totalCharityDistributedNgn: 42000000,
  undistributedFundsNgn: 545450000,
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
    allocatedAmountNgn: 14000000,
    disbursedAmountNgn: 14000000,
    lastDisbursementDate: '2025-03-01',
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
    allocatedAmountNgn: 10500000,
    disbursedAmountNgn: 10500000,
    lastDisbursementDate: '2025-03-05',
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
    allocatedAmountNgn: 6500000,
    disbursedAmountNgn: 6500000,
    lastDisbursementDate: '2025-03-10',
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
    allocatedAmountNgn: 5800000,
    disbursedAmountNgn: 5800000,
    lastDisbursementDate: '2025-03-12',
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
    allocatedAmountNgn: 5200000,
    disbursedAmountNgn: 5200000,
    lastDisbursementDate: '2025-03-15',
    proofDocumentUrl: 'https://kanoyouthcare.org/audit'
  }
];

export const INITIAL_STATES: StatePollData[] = [
  { stateCode: 'AB', stateName: 'Abia', zone: 'South East', participants: 12450, totalAmountNgn: 18700000, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: 'obi-peter', topCivicIssue: 'Commercial Infrastructure & Aba Road Corridors' },
  { stateCode: 'AD', stateName: 'Adamawa', zone: 'North East', participants: 9800, totalAmountNgn: 14600000, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: 'atiku-abubakar', topCivicIssue: 'Border Trade & Agricultural Irrigation' },
  { stateCode: 'AK', stateName: 'Akwa Ibom', zone: 'South South', participants: 11200, totalAmountNgn: 16900000, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: 'onor-sandy', topCivicIssue: 'Deep Sea Port & Industrial Employment' },
  { stateCode: 'AN', stateName: 'Anambra', zone: 'South East', participants: 19800, totalAmountNgn: 31200000, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: 'obi-peter', topCivicIssue: 'Industrial Parks & Security Normalisation' },
  { stateCode: 'BA', stateName: 'Bauchi', zone: 'North East', participants: 8400, totalAmountNgn: 12500000, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: 'atiku-abubakar', topCivicIssue: 'Primary Healthcare & Pastoral Support' },
  { stateCode: 'BY', stateName: 'Bayelsa', zone: 'South South', participants: 7200, totalAmountNgn: 10800000, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: 'duke-donald', topCivicIssue: 'Environmental Remediation & Marine Economy' },
  { stateCode: 'BE', stateName: 'Benue', zone: 'North Central', participants: 10400, totalAmountNgn: 15600000, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: 'okwori-ada', topCivicIssue: 'Food Basket Security & Agro-Processing' },
  { stateCode: 'BO', stateName: 'Borno', zone: 'North East', participants: 9100, totalAmountNgn: 13800000, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: 'tinubu-bola', topCivicIssue: 'Post-Conflict Reconstruction & Chad Basin Commerce' },
  { stateCode: 'CR', stateName: 'Cross River', zone: 'South South', participants: 14500, totalAmountNgn: 22400000, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: 'duke-donald', topCivicIssue: 'Eco-Tourism & Cross-Border Logistics' },
  { stateCode: 'DE', stateName: 'Delta', zone: 'South South', participants: 13200, totalAmountNgn: 19800000, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: 'obi-peter', topCivicIssue: 'Host Community Development & Gas Flaring Curb' },
  { stateCode: 'EB', stateName: 'Ebonyi', zone: 'South East', participants: 8900, totalAmountNgn: 13400000, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: 'obi-peter', topCivicIssue: 'Rice Milling & Mining Safety' },
  { stateCode: 'ED', stateName: 'Edo', zone: 'South South', participants: 12800, totalAmountNgn: 19200000, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: 'obi-peter', topCivicIssue: 'Tech Ecosystem & Vocational Apprenticeships' },
  { stateCode: 'EK', stateName: 'Ekiti', zone: 'South West', participants: 7600, totalAmountNgn: 11400000, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: 'tinubu-bola', topCivicIssue: 'Knowledge Economy & Agricultural Tech' },
  { stateCode: 'EN', stateName: 'Enugu', zone: 'South East', participants: 16700, totalAmountNgn: 25800000, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: 'obi-peter', topCivicIssue: 'Water Supply & Regional Aviation Hub' },
  { stateCode: 'FC', stateName: 'Federal Capital Territory (Abuja)', zone: 'North Central', participants: 22400, totalAmountNgn: 36500000, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: 'obi-peter', topCivicIssue: 'Satellite Town Infrastructure & Civic Inclusivity' },
  { stateCode: 'GO', stateName: 'Gombe', zone: 'North East', participants: 6800, totalAmountNgn: 10200000, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: 'atiku-abubakar', topCivicIssue: 'Logistics Center & Dry Port Development' },
  { stateCode: 'IM', stateName: 'Imo', zone: 'South East', participants: 15300, totalAmountNgn: 23500000, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: 'obi-peter', topCivicIssue: 'Digital Jobs & Youth Security Restitution' },
  { stateCode: 'JI', stateName: 'Jigawa', zone: 'North West', participants: 8100, totalAmountNgn: 12100000, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: 'atiku-abubakar', topCivicIssue: 'Solar Irrigation & Sesame/Wheat Value Chain' },
  { stateCode: 'KD', stateName: 'Kaduna', zone: 'North West', participants: 16400, totalAmountNgn: 24800000, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: 'tinubu-bola', topCivicIssue: 'Railway Modernisation & Educational Hub' },
  { stateCode: 'KN', stateName: 'Kano', zone: 'North West', participants: 24800, totalAmountNgn: 38200000, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: 'obi-peter', topCivicIssue: 'Textile Industry Revival & Commercial Transit' },
  { stateCode: 'KT', stateName: 'Katsina', zone: 'North West', participants: 9900, totalAmountNgn: 14800000, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: 'tinubu-bola', topCivicIssue: 'Border Surveillance & Renewable Energy' },
  { stateCode: 'KE', stateName: 'Kebbi', zone: 'North West', participants: 7400, totalAmountNgn: 11100000, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: 'atiku-abubakar', topCivicIssue: 'Anchor Borrowers Continuity & Cross-Border Rice Trade' },
  { stateCode: 'KO', stateName: 'Kogi', zone: 'North Central', participants: 8900, totalAmountNgn: 13350000, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: 'tinubu-bola', topCivicIssue: 'Ajaokuta Steel Activation & Confluence Tourism' },
  { stateCode: 'KW', stateName: 'Kwara', zone: 'North Central', participants: 9200, totalAmountNgn: 13800000, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: 'tinubu-bola', topCivicIssue: 'Agro-Allied Cargo Terminal & Light Manufacturing' },
  { stateCode: 'LA', stateName: 'Lagos', zone: 'South West', participants: 34500, totalAmountNgn: 54200000, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: 'tinubu-bola', topCivicIssue: 'Mass Transit Multimodal & Digital Creative Economy' },
  { stateCode: 'NA', stateName: 'Nasarawa', zone: 'North Central', participants: 7800, totalAmountNgn: 11700000, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: 'tinubu-bola', topCivicIssue: 'Solid Mineral Extraction & Abuja Corridor Living' },
  { stateCode: 'NI', stateName: 'Niger', zone: 'North Central', participants: 8600, totalAmountNgn: 12900000, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: 'tinubu-bola', topCivicIssue: 'Hydroelectric Host Compensation & Farmland Security' },
  { stateCode: 'OG', stateName: 'Ogun', zone: 'South West', participants: 12900, totalAmountNgn: 19500000, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: 'tinubu-bola', topCivicIssue: 'Industrial Zone Infrastructure & Road Interlinks' },
  { stateCode: 'ON', stateName: 'Ondo', zone: 'South West', participants: 9800, totalAmountNgn: 14700000, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: 'tinubu-bola', topCivicIssue: 'Bitumen Exploitation & Coastal Port Connectivity' },
  { stateCode: 'OS', stateName: 'Osun', zone: 'South West', participants: 10200, totalAmountNgn: 15300000, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: 'makinde-seyi', topCivicIssue: 'Mining Formalisation & Cultural Tourism' },
  { stateCode: 'OY', stateName: 'Oyo', zone: 'South West', participants: 18900, totalAmountNgn: 29800000, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: 'makinde-seyi', topCivicIssue: 'Agribusiness Hub & Ibadan Circular Belt' },
  { stateCode: 'PL', stateName: 'Plateau', zone: 'North Central', participants: 11400, totalAmountNgn: 17100000, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: 'obi-peter', topCivicIssue: 'Peace Architecture & Temperate Horticulture' },
  { stateCode: 'RI', stateName: 'Rivers', zone: 'South South', participants: 19500, totalAmountNgn: 30500000, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: 'atiku-abubakar', topCivicIssue: 'Hydrocarbon Transition & Seaport Efficiency' },
  { stateCode: 'SO', stateName: 'Sokoto', zone: 'North West', participants: 8200, totalAmountNgn: 12300000, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: 'atiku-abubakar', topCivicIssue: 'Desertification Buffer & Cement Manufacturing' },
  { stateCode: 'TA', stateName: 'Taraba', zone: 'North East', participants: 7100, totalAmountNgn: 10650000, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: 'atiku-abubakar', topCivicIssue: 'Mambilla Hydro Project & Tea/Coffee Farming' },
  { stateCode: 'YO', stateName: 'Yobe', zone: 'North East', participants: 6900, totalAmountNgn: 10350000, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: 'tinubu-bola', topCivicIssue: 'Gum Arabic Processing & Nomadic Education' },
  { stateCode: 'ZA', stateName: 'Zamfara', zone: 'North West', participants: 7700, totalAmountNgn: 11550000, candidateVotes: {}, candidateAmounts: {}, leadingCandidateId: 'atiku-abubakar', topCivicIssue: 'Artisanal Gold Regulation & Rural Peace Enforcement' }
];
