/**
 * GENERATED FILE — DO NOT EDIT BY HAND.
 *
 * Produced by scripts/data-pipeline.ts from data/seed/ and data/imports/.
 * Run `npm run data:build` to regenerate.
 */
import type { Catalogue } from '../domain/catalogue/types'

export const catalogue: Catalogue = {
  "universities": [
    {
      "id": "atu",
      "name": "Accra Technical University",
      "shortName": "Accra Technical Univ.",
      "city": "Accra",
      "region": "Greater Accra",
      "admissionsUrl": "https://atu.edu.gh/admissions"
    },
    {
      "id": "knust",
      "name": "Kwame Nkrumah University of Science and Technology",
      "shortName": "KNUST",
      "city": "Kumasi",
      "region": "Ashanti",
      "admissionsUrl": "https://apps.knust.edu.gh/admissions"
    },
    {
      "id": "ucc",
      "name": "University of Cape Coast",
      "shortName": "University of Cape Coast",
      "city": "Cape Coast",
      "region": "Central",
      "admissionsUrl": "https://admission.ucc.edu.gh"
    },
    {
      "id": "uds",
      "name": "University for Development Studies",
      "shortName": "UDS",
      "city": "Tamale",
      "region": "Northern",
      "admissionsUrl": "https://uds.edu.gh/admissions"
    },
    {
      "id": "uew",
      "name": "University of Education, Winneba",
      "shortName": "UEW",
      "city": "Winneba",
      "region": "Central",
      "admissionsUrl": "https://uew.edu.gh/admissions"
    },
    {
      "id": "ug",
      "name": "University of Ghana",
      "shortName": "University of Ghana",
      "city": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionsUrl": "https://admission.ug.edu.gh"
    },
    {
      "id": "uhas",
      "name": "University of Health and Allied Sciences",
      "shortName": "UHAS",
      "city": "Ho",
      "region": "Volta",
      "admissionsUrl": "https://uhas.edu.gh/admissions"
    },
    {
      "id": "upsa",
      "name": "University of Professional Studies, Accra",
      "shortName": "UPSA",
      "city": "Accra",
      "region": "Greater Accra",
      "admissionsUrl": "https://upsa.edu.gh/admissions"
    }
  ],
  "programmes": [
    {
      "id": "atu-hospitality-management",
      "name": "Hospitality Management",
      "universityId": "atu",
      "faculty": "Faculty of Applied Sciences",
      "degreeType": "BTech",
      "durationYears": 4,
      "campus": "Accra",
      "region": "Greater Accra",
      "overview": "Accra Technical University's Hospitality Management programme is practice-led, covering food and beverage operations, front office and events, with industrial attachment built in.",
      "pros": [
        "Most accessible cut-off listed",
        "Hands-on industrial attachment",
        "Tourism sector growth"
      ],
      "cons": [
        "Shift and weekend work",
        "Lower starting salaries"
      ],
      "careers": [
        "Hotel Manager",
        "Events Coordinator",
        "Food and Beverage Supervisor"
      ],
      "annualFeesGhs": 2900,
      "employmentRatePct": 79,
      "salary": {
        "minMonthly": 1800,
        "maxMonthly": 5000
      },
      "cutoffTrend": [
        {
          "year": 2024,
          "aggregate": 24
        },
        {
          "year": 2025,
          "aggregate": 24
        }
      ],
      "requirements": {
        "minimumAggregate": 24,
        "coreSubjects": [
          {
            "subject": "English Language",
            "minimumGrade": "C6"
          },
          {
            "subject": "Core Mathematics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Social Studies",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "Aggregate 24 is the general minimum entry requirement for degree admission in Ghana.",
          "Cut-off not yet verified against an ATU publication; treat as indicative.",
          "Fees and salary figures are indicative estimates, not official."
        ]
      },
      "provenance": {
        "source": "UniMatch seed estimate — not verified against a university publication",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "knust-agribusiness-management",
      "name": "Agribusiness Management",
      "universityId": "knust",
      "faculty": "College of Agriculture and Natural Resources",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "overview": "Agribusiness Management combines agricultural science with finance, marketing and supply chain management, aimed at the commercial side of Ghana's agriculture sector.",
      "pros": [
        "Business and agriculture crossover",
        "Accessible cut-off",
        "Entrepreneurship routes"
      ],
      "cons": [
        "Field work required",
        "Sector income can be seasonal"
      ],
      "careers": [
        "Agribusiness Manager",
        "Supply Chain Analyst",
        "Agricultural Economist"
      ],
      "annualFeesGhs": 3600,
      "employmentRatePct": 84,
      "salary": {
        "minMonthly": 2400,
        "maxMonthly": 7000
      },
      "cutoffTrend": [
        {
          "year": 2024,
          "aggregate": 17
        },
        {
          "year": 2025,
          "aggregate": 17
        },
        {
          "year": 2026,
          "aggregate": 17
        }
      ],
      "requirements": {
        "minimumAggregate": 17,
        "coreSubjects": [
          {
            "subject": "English Language",
            "minimumGrade": "C6"
          },
          {
            "subject": "Core Mathematics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [
          {
            "subject": "General Agriculture",
            "alternatives": [
              "Biology",
              "Economics"
            ],
            "minimumGrade": "C6"
          },
          {
            "subject": "Chemistry",
            "alternatives": [
              "Business Management"
            ],
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "KNUST requires credit passes in three cores and three relevant electives, aggregate 24 or better overall.",
          "Programme cut-off reported by secondary sources; confirm on the KNUST admissions portal.",
          "Fees and salary figures are indicative estimates, not official."
        ]
      },
      "provenance": {
        "source": "KNUST cut-off point reporting for the College of Agriculture and Natural Resources (secondary source)",
        "sourceUrl": "https://ghstudents.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-agriculture",
      "name": "Agriculture",
      "universityId": "knust",
      "faculty": "College of Agriculture and Natural Resources",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "overview": "BSc Agriculture at KNUST covers crop and animal science, soil science and agricultural extension, with substantial practical work on the university's research farms.",
      "pros": [
        "One of the most accessible KNUST cut-offs",
        "Practical farm training",
        "Food security relevance"
      ],
      "cons": [
        "Field work in all weather",
        "Modest starting salaries"
      ],
      "careers": [
        "Agronomist",
        "Extension Officer",
        "Farm Manager"
      ],
      "annualFeesGhs": 3400,
      "employmentRatePct": 80,
      "salary": {
        "minMonthly": 2000,
        "maxMonthly": 5800
      },
      "cutoffTrend": [
        {
          "year": 2024,
          "aggregate": 22
        },
        {
          "year": 2025,
          "aggregate": 22
        },
        {
          "year": 2026,
          "aggregate": 22
        }
      ],
      "requirements": {
        "minimumAggregate": 22,
        "coreSubjects": [
          {
            "subject": "English Language",
            "minimumGrade": "C6"
          },
          {
            "subject": "Core Mathematics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [
          {
            "subject": "General Agriculture",
            "alternatives": [
              "Biology"
            ],
            "minimumGrade": "C6"
          },
          {
            "subject": "Chemistry",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "KNUST requires credit passes in three cores and three relevant electives, aggregate 24 or better overall.",
          "Programme cut-off reported by secondary sources; confirm on the KNUST admissions portal.",
          "Fees and salary figures are indicative estimates, not official."
        ]
      },
      "provenance": {
        "source": "KNUST cut-off point reporting for the College of Agriculture and Natural Resources (secondary source)",
        "sourceUrl": "https://ghstudents.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-biomedical-engineering",
      "name": "Biomedical Engineering",
      "universityId": "knust",
      "faculty": "College of Engineering",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "overview": "Biomedical Engineering at KNUST applies engineering to healthcare, covering medical instrumentation, biomechanics and imaging, with clinical exposure in teaching hospitals.",
      "pros": [
        "Healthcare and engineering crossover",
        "Scarce specialist skill",
        "Strong postgraduate pathways"
      ],
      "cons": [
        "Extremely competitive",
        "Long laboratory hours"
      ],
      "careers": [
        "Biomedical Engineer",
        "Clinical Engineer",
        "Medical Device Specialist"
      ],
      "annualFeesGhs": 5400,
      "employmentRatePct": 92,
      "salary": {
        "minMonthly": 4500,
        "maxMonthly": 13000
      },
      "cutoffTrend": [
        {
          "year": 2024,
          "aggregate": 7
        },
        {
          "year": 2025,
          "aggregate": 6
        },
        {
          "year": 2026,
          "aggregate": 6
        }
      ],
      "requirements": {
        "minimumAggregate": 6,
        "coreSubjects": [
          {
            "subject": "English Language",
            "minimumGrade": "C6"
          },
          {
            "subject": "Core Mathematics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [
          {
            "subject": "Elective Mathematics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Physics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Chemistry",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "KNUST requires credit passes in three cores and three relevant electives, aggregate 24 or better overall.",
          "Programme cut-off reported by secondary sources; confirm on the KNUST admissions portal.",
          "Fees and salary figures are indicative estimates, not official."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off point reporting (secondary source; not the university's own publication)",
        "sourceUrl": "https://ghanadmission.com/knust-cut-off-point-2/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-computer-engineering",
      "name": "Computer Engineering",
      "universityId": "knust",
      "faculty": "College of Engineering",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "overview": "Computer Engineering at KNUST spans digital systems, embedded design, computer architecture and networks, and is consistently among the most competitive programmes in the country.",
      "pros": [
        "Top-tier employability",
        "Hardware and software breadth",
        "Strong industry links"
      ],
      "cons": [
        "Aggregate 6 leaves no margin",
        "Very demanding workload"
      ],
      "careers": [
        "Computer Engineer",
        "Embedded Systems Engineer",
        "Network Engineer"
      ],
      "annualFeesGhs": 5200,
      "employmentRatePct": 95,
      "salary": {
        "minMonthly": 4800,
        "maxMonthly": 14000
      },
      "cutoffTrend": [
        {
          "year": 2024,
          "aggregate": 7
        },
        {
          "year": 2025,
          "aggregate": 6
        },
        {
          "year": 2026,
          "aggregate": 6
        }
      ],
      "requirements": {
        "minimumAggregate": 6,
        "coreSubjects": [
          {
            "subject": "English Language",
            "minimumGrade": "C6"
          },
          {
            "subject": "Core Mathematics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [
          {
            "subject": "Elective Mathematics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Physics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Chemistry",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "KNUST requires credit passes in three cores and three relevant electives, aggregate 24 or better overall.",
          "Programme cut-off reported by secondary sources; confirm on the KNUST admissions portal.",
          "Fees and salary figures are indicative estimates, not official."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off point reporting (secondary source; not the university's own publication)",
        "sourceUrl": "https://ghanadmission.com/knust-cut-off-point-2/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-bed-accounting",
      "name": "Accounting Education",
      "universityId": "ucc",
      "faculty": "Faculty of Business Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "overview": "B.Ed Accounting prepares graduates to teach accounting at senior high school level while retaining the technical grounding to enter professional accountancy practice.",
      "pros": [
        "Teaching and practice routes",
        "Reliable public-sector employment",
        "Affordable fees"
      ],
      "cons": [
        "Teaching service posting may be rural",
        "Narrower than a general business degree"
      ],
      "careers": [
        "Accounting Teacher",
        "Accountant",
        "Auditor"
      ],
      "annualFeesGhs": 2800,
      "employmentRatePct": 88,
      "salary": {
        "minMonthly": 2200,
        "maxMonthly": 6500
      },
      "cutoffTrend": [
        {
          "year": 2024,
          "aggregate": 12
        },
        {
          "year": 2025,
          "aggregate": 18
        }
      ],
      "requirements": {
        "minimumAggregate": 18,
        "coreSubjects": [
          {
            "subject": "English Language",
            "minimumGrade": "C6"
          },
          {
            "subject": "Core Mathematics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Social Studies",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [
          {
            "subject": "Financial Accounting",
            "minimumGrade": "C6"
          },
          {
            "subject": "Business Management",
            "alternatives": [
              "Economics"
            ],
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Post-WASSCE 2025 cut-off. The 2024 awaiting-results cut-off was 12.",
          "Fees and salary figures are indicative estimates, not official."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast — Cut-off Points, 2025/2026 admissions catalogue",
        "sourceUrl": "https://admissions.ucc.edu.gh/catalogue/programme/cut-off-points",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ucc-bed-agriculture",
      "name": "Agriculture Education",
      "universityId": "ucc",
      "faculty": "Faculty of Science and Technology Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "overview": "B.Ed Agriculture covers crop and animal science, agricultural economics and extension alongside teaching methods, with practical work on the university farm.",
      "pros": [
        "Most accessible cut-off in the faculty",
        "Practical farm training",
        "Agribusiness routes"
      ],
      "cons": [
        "Field work in all weather",
        "Lower urban demand"
      ],
      "careers": [
        "Agriculture Teacher",
        "Extension Officer",
        "Agribusiness Manager"
      ],
      "annualFeesGhs": 2600,
      "employmentRatePct": 84,
      "salary": {
        "minMonthly": 2000,
        "maxMonthly": 5500
      },
      "cutoffTrend": [
        {
          "year": 2024,
          "aggregate": 23
        },
        {
          "year": 2025,
          "aggregate": 22
        }
      ],
      "requirements": {
        "minimumAggregate": 22,
        "coreSubjects": [
          {
            "subject": "English Language",
            "minimumGrade": "C6"
          },
          {
            "subject": "Core Mathematics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [
          {
            "subject": "General Agriculture",
            "alternatives": [
              "Biology"
            ],
            "minimumGrade": "C6"
          },
          {
            "subject": "Chemistry",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Post-WASSCE 2025 cut-off published by the University of Cape Coast.",
          "Fees and salary figures are indicative estimates, not official."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast — Cut-off Points, 2025/2026 admissions catalogue",
        "sourceUrl": "https://admissions.ucc.edu.gh/catalogue/programme/cut-off-points",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ucc-bed-early-childhood",
      "name": "Early Childhood Education",
      "universityId": "ucc",
      "faculty": "Faculty of Educational Foundations",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "overview": "Early Childhood Education covers child development, play-based pedagogy and inclusive practice, preparing graduates to teach and lead in kindergarten and lower primary settings.",
      "pros": [
        "Consistent demand for teachers",
        "Accessible cut-off",
        "Affordable fees"
      ],
      "cons": [
        "Lower starting salary",
        "Physically demanding classroom work"
      ],
      "careers": [
        "Early Years Teacher",
        "Education Officer",
        "Curriculum Developer"
      ],
      "annualFeesGhs": 2500,
      "employmentRatePct": 90,
      "salary": {
        "minMonthly": 1900,
        "maxMonthly": 4800
      },
      "cutoffTrend": [
        {
          "year": 2024,
          "aggregate": 19
        },
        {
          "year": 2025,
          "aggregate": 20
        }
      ],
      "requirements": {
        "minimumAggregate": 20,
        "coreSubjects": [
          {
            "subject": "English Language",
            "minimumGrade": "C6"
          },
          {
            "subject": "Core Mathematics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Social Studies",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "Post-WASSCE 2025 cut-off published by the University of Cape Coast.",
          "Fees and salary figures are indicative estimates, not official."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast — Cut-off Points, 2025/2026 admissions catalogue",
        "sourceUrl": "https://admissions.ucc.edu.gh/catalogue/programme/cut-off-points",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ucc-bed-economics",
      "name": "Economics Education",
      "universityId": "ucc",
      "faculty": "Faculty of Social Sciences Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "overview": "B.Ed Economics combines economic theory, statistics and pedagogy, qualifying graduates to teach economics while opening routes into research and policy analysis.",
      "pros": [
        "Analytical skill set",
        "Teaching and policy routes",
        "Affordable fees"
      ],
      "cons": [
        "Posting may be outside preferred region",
        "Mathematics-heavy"
      ],
      "careers": [
        "Economics Teacher",
        "Research Analyst",
        "Policy Officer"
      ],
      "annualFeesGhs": 2700,
      "employmentRatePct": 85,
      "salary": {
        "minMonthly": 2200,
        "maxMonthly": 6000
      },
      "cutoffTrend": [
        {
          "year": 2024,
          "aggregate": 19
        },
        {
          "year": 2025,
          "aggregate": 18
        }
      ],
      "requirements": {
        "minimumAggregate": 18,
        "coreSubjects": [
          {
            "subject": "English Language",
            "minimumGrade": "C6"
          },
          {
            "subject": "Core Mathematics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Social Studies",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [
          {
            "subject": "Economics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Post-WASSCE 2025 cut-off published by the University of Cape Coast.",
          "Fees and salary figures are indicative estimates, not official."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast — Cut-off Points, 2025/2026 admissions catalogue",
        "sourceUrl": "https://admissions.ucc.edu.gh/catalogue/programme/cut-off-points",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ucc-bed-electrical-engineering",
      "name": "Electrical and Electronic Engineering Education",
      "universityId": "ucc",
      "faculty": "Faculty of Science and Technology Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "overview": "This programme combines electrical and electronic engineering practice with technical pedagogy, qualifying graduates to teach in technical institutes or work in the power and electronics sector.",
      "pros": [
        "Practical workshop training",
        "Technical and teaching routes",
        "Infrastructure sector demand"
      ],
      "cons": [
        "Demanding mathematics and physics",
        "Workshop-intensive timetable"
      ],
      "careers": [
        "Technical Instructor",
        "Electrical Technician",
        "Maintenance Engineer"
      ],
      "annualFeesGhs": 3100,
      "employmentRatePct": 87,
      "salary": {
        "minMonthly": 2500,
        "maxMonthly": 7500
      },
      "cutoffTrend": [
        {
          "year": 2024,
          "aggregate": 20
        },
        {
          "year": 2025,
          "aggregate": 19
        }
      ],
      "requirements": {
        "minimumAggregate": 19,
        "coreSubjects": [
          {
            "subject": "English Language",
            "minimumGrade": "C6"
          },
          {
            "subject": "Core Mathematics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [
          {
            "subject": "Physics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Elective Mathematics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Post-WASSCE 2025 cut-off published by the University of Cape Coast.",
          "Fees and salary figures are indicative estimates, not official."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast — Cut-off Points, 2025/2026 admissions catalogue",
        "sourceUrl": "https://admissions.ucc.edu.gh/catalogue/programme/cut-off-points",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "uds-nursing",
      "name": "Nursing",
      "universityId": "uds",
      "faculty": "School of Nursing and Midwifery",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "overview": "Nursing at UDS trains students to deliver patient-centred care across community and clinical settings in northern Ghana, with supervised placements from the second year.",
      "pros": [
        "Near-guaranteed employment",
        "Accessible cut-off",
        "Affordable fees"
      ],
      "cons": [
        "Physically demanding rotations",
        "Shift work"
      ],
      "careers": [
        "Registered Nurse",
        "Community Health Officer",
        "Midwife"
      ],
      "annualFeesGhs": 2200,
      "employmentRatePct": 98,
      "salary": {
        "minMonthly": 2200,
        "maxMonthly": 5500
      },
      "cutoffTrend": [
        {
          "year": 2024,
          "aggregate": 20
        },
        {
          "year": 2025,
          "aggregate": 20
        }
      ],
      "requirements": {
        "minimumAggregate": 20,
        "coreSubjects": [
          {
            "subject": "English Language",
            "minimumGrade": "C6"
          },
          {
            "subject": "Core Mathematics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [
          {
            "subject": "Biology",
            "minimumGrade": "C6"
          },
          {
            "subject": "Chemistry",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Cut-off not yet verified against a UDS publication; treat as indicative.",
          "Fees and salary figures are indicative estimates, not official."
        ]
      },
      "provenance": {
        "source": "UniMatch prototype dataset — not verified against a university publication",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uew-bed-mathematics",
      "name": "Mathematics Education",
      "universityId": "uew",
      "faculty": "Faculty of Science Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Winneba",
      "region": "Central",
      "overview": "UEW is Ghana's dedicated teacher-training university, and its Mathematics Education programme combines advanced mathematics with pedagogy for senior high school teaching.",
      "pros": [
        "Reliable teaching service employment",
        "Accessible cut-off",
        "Affordable fees"
      ],
      "cons": [
        "Posting may be rural",
        "Mathematics-intensive"
      ],
      "careers": [
        "Mathematics Teacher",
        "Education Officer",
        "Curriculum Developer"
      ],
      "annualFeesGhs": 2400,
      "employmentRatePct": 92,
      "salary": {
        "minMonthly": 2000,
        "maxMonthly": 5200
      },
      "cutoffTrend": [
        {
          "year": 2024,
          "aggregate": 22
        },
        {
          "year": 2025,
          "aggregate": 21
        }
      ],
      "requirements": {
        "minimumAggregate": 21,
        "coreSubjects": [
          {
            "subject": "English Language",
            "minimumGrade": "C6"
          },
          {
            "subject": "Core Mathematics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [
          {
            "subject": "Elective Mathematics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Cut-off not yet verified against a UEW publication; treat as indicative.",
          "Fees and salary figures are indicative estimates, not official."
        ]
      },
      "provenance": {
        "source": "UniMatch seed estimate — not verified against a university publication",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "ug-actuarial-science",
      "name": "Actuarial Science",
      "universityId": "ug",
      "faculty": "School of Physical and Mathematical Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "overview": "Actuarial Science applies mathematics, statistics and financial theory to risk in insurance and pensions, and aligns with the professional actuarial examinations.",
      "pros": [
        "High earning ceiling",
        "Professional exam alignment",
        "Scarce skill in Ghana"
      ],
      "cons": [
        "Very mathematics-intensive",
        "Professional exams take years"
      ],
      "careers": [
        "Actuary",
        "Risk Analyst",
        "Pensions Consultant"
      ],
      "annualFeesGhs": 5200,
      "employmentRatePct": 91,
      "salary": {
        "minMonthly": 4000,
        "maxMonthly": 15000
      },
      "cutoffTrend": [
        {
          "year": 2023,
          "aggregate": 12
        },
        {
          "year": 2024,
          "aggregate": 11
        },
        {
          "year": 2025,
          "aggregate": 11
        }
      ],
      "requirements": {
        "minimumAggregate": 11,
        "coreSubjects": [
          {
            "subject": "English Language",
            "minimumGrade": "C6"
          },
          {
            "subject": "Core Mathematics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [
          {
            "subject": "Elective Mathematics",
            "minimumGrade": "B3"
          }
        ],
        "notes": [
          "The University of Ghana requires B3 in Elective Mathematics for this programme.",
          "Fees and salary figures are indicative estimates, not official."
        ]
      },
      "provenance": {
        "source": "University of Ghana — Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-administration",
      "name": "Administration",
      "universityId": "ug",
      "faculty": "Business School",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "overview": "BSc Administration at UG Business School covers accounting, banking, marketing, insurance and human resource management, with specialisation from the second year onward.",
      "pros": [
        "Broad career options",
        "Strong alumni network",
        "Specialisation choices"
      ],
      "cons": [
        "Competitive first-choice cut-off",
        "Large class sizes"
      ],
      "careers": [
        "Business Analyst",
        "Accountant",
        "Marketing Manager"
      ],
      "annualFeesGhs": 5000,
      "employmentRatePct": 88,
      "salary": {
        "minMonthly": 2800,
        "maxMonthly": 9000
      },
      "cutoffTrend": [
        {
          "year": 2023,
          "aggregate": 10
        },
        {
          "year": 2024,
          "aggregate": 9
        },
        {
          "year": 2025,
          "aggregate": 9
        }
      ],
      "requirements": {
        "minimumAggregate": 9,
        "coreSubjects": [
          {
            "subject": "English Language",
            "minimumGrade": "C6"
          },
          {
            "subject": "Core Mathematics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Social Studies",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "Cut-off shown is the first-choice aggregate; full-fee-paying entry is aggregate 12.",
          "Fees and salary figures are indicative estimates, not official."
        ]
      },
      "provenance": {
        "source": "University of Ghana — Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-biomedical-engineering",
      "name": "Biomedical Engineering",
      "universityId": "ug",
      "faculty": "School of Engineering Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "overview": "Biomedical Engineering applies engineering principles to medicine and healthcare, covering medical devices, imaging and biomechanics. It carries the lowest published cut-off at the University of Ghana.",
      "pros": [
        "Most competitive engineering entry",
        "Healthcare and tech crossover",
        "Strong postgraduate pathways"
      ],
      "cons": [
        "Aggregate 6 leaves no margin",
        "Heavy mathematics and physics load"
      ],
      "careers": [
        "Biomedical Engineer",
        "Clinical Engineer",
        "Medical Device Specialist"
      ],
      "annualFeesGhs": 5600,
      "employmentRatePct": 90,
      "salary": {
        "minMonthly": 4500,
        "maxMonthly": 13000
      },
      "cutoffTrend": [
        {
          "year": 2023,
          "aggregate": 7
        },
        {
          "year": 2024,
          "aggregate": 6
        },
        {
          "year": 2025,
          "aggregate": 6
        }
      ],
      "requirements": {
        "minimumAggregate": 6,
        "coreSubjects": [
          {
            "subject": "English Language",
            "minimumGrade": "C6"
          },
          {
            "subject": "Core Mathematics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [
          {
            "subject": "Elective Mathematics",
            "minimumGrade": "B3"
          }
        ],
        "notes": [
          "Requires B3 in Elective Mathematics. Aggregate 6 is the best achievable score.",
          "Fees and salary figures are indicative estimates, not official."
        ]
      },
      "provenance": {
        "source": "University of Ghana — Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-computer-science",
      "name": "Computer Science",
      "universityId": "ug",
      "faculty": "School of Physical and Mathematical Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "overview": "Computer Science at Legon covers algorithms, systems and software engineering with a strong mathematical foundation, and feeds directly into Ghana's growing technology sector.",
      "pros": [
        "High employment rate",
        "Growing tech industry",
        "Versatile degree"
      ],
      "cons": [
        "Highly competitive",
        "Requires strong Elective Mathematics"
      ],
      "careers": [
        "Software Engineer",
        "Data Scientist",
        "Cybersecurity Analyst"
      ],
      "annualFeesGhs": 4800,
      "employmentRatePct": 94,
      "salary": {
        "minMonthly": 4500,
        "maxMonthly": 12000
      },
      "cutoffTrend": [
        {
          "year": 2022,
          "aggregate": 9
        },
        {
          "year": 2023,
          "aggregate": 8
        },
        {
          "year": 2024,
          "aggregate": 8
        },
        {
          "year": 2025,
          "aggregate": 7
        }
      ],
      "requirements": {
        "minimumAggregate": 7,
        "coreSubjects": [
          {
            "subject": "English Language",
            "minimumGrade": "C6"
          },
          {
            "subject": "Core Mathematics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [
          {
            "subject": "Elective Mathematics",
            "minimumGrade": "B3"
          }
        ],
        "notes": [
          "The University of Ghana requires B3 in Elective Mathematics for this programme.",
          "Fees and salary figures are indicative estimates, not official."
        ]
      },
      "provenance": {
        "source": "University of Ghana — Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-information-technology",
      "name": "Information Technology",
      "universityId": "ug",
      "faculty": "School of Physical and Mathematical Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "overview": "BSc Information Technology is the applied counterpart to Computer Science, focusing on networks, systems administration and information systems rather than theory, with a more accessible cut-off.",
      "pros": [
        "More accessible than Computer Science",
        "Applied and practical",
        "Strong industry demand"
      ],
      "cons": [
        "Less theoretical depth",
        "Requires C4 in Core Mathematics"
      ],
      "careers": [
        "IT Support Specialist",
        "Network Administrator",
        "Systems Analyst"
      ],
      "annualFeesGhs": 4600,
      "employmentRatePct": 90,
      "salary": {
        "minMonthly": 3200,
        "maxMonthly": 9500
      },
      "cutoffTrend": [
        {
          "year": 2023,
          "aggregate": 12
        },
        {
          "year": 2024,
          "aggregate": 11
        },
        {
          "year": 2025,
          "aggregate": 10
        }
      ],
      "requirements": {
        "minimumAggregate": 10,
        "coreSubjects": [
          {
            "subject": "English Language",
            "minimumGrade": "C6"
          },
          {
            "subject": "Core Mathematics",
            "minimumGrade": "C4"
          },
          {
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "The University of Ghana requires C4 in Core Mathematics for this programme.",
          "Fees and salary figures are indicative estimates, not official."
        ]
      },
      "provenance": {
        "source": "University of Ghana — Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-law",
      "name": "Law",
      "universityId": "ug",
      "faculty": "School of Law",
      "degreeType": "LLB",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "overview": "The Bachelor of Laws at the University of Ghana builds a foundation in Ghanaian and common law, with emphasis on legal reasoning, mooting and clinical legal education ahead of professional law school.",
      "pros": [
        "Prestigious profession",
        "High earning potential",
        "Diverse practice areas"
      ],
      "cons": [
        "Very competitive admission",
        "Reading-intensive",
        "Bar exams add further years"
      ],
      "careers": [
        "Lawyer",
        "Legal Consultant",
        "Policy Analyst"
      ],
      "annualFeesGhs": 5200,
      "employmentRatePct": 89,
      "salary": {
        "minMonthly": 5000,
        "maxMonthly": 20000
      },
      "cutoffTrend": [
        {
          "year": 2022,
          "aggregate": 8
        },
        {
          "year": 2023,
          "aggregate": 8
        },
        {
          "year": 2024,
          "aggregate": 7
        },
        {
          "year": 2025,
          "aggregate": 7
        }
      ],
      "requirements": {
        "minimumAggregate": 7,
        "coreSubjects": [
          {
            "subject": "English Language",
            "minimumGrade": "C6"
          },
          {
            "subject": "Core Mathematics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Social Studies",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "Cut-off shown is the first-choice aggregate published by the University of Ghana.",
          "Fees and salary figures are indicative estimates, not official."
        ]
      },
      "provenance": {
        "source": "University of Ghana — Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-medical-laboratory-sciences",
      "name": "Medical Laboratory Sciences",
      "universityId": "ug",
      "faculty": "School of Biomedical and Allied Health Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Korle Bu)",
      "region": "Greater Accra",
      "overview": "Medical Laboratory Sciences trains diagnostic scientists in haematology, microbiology, clinical chemistry and immunology, with laboratory placements throughout the programme.",
      "pros": [
        "Essential clinical role",
        "Strong diagnostic sector demand",
        "Laboratory placements"
      ],
      "cons": [
        "Less patient contact",
        "Rigorous laboratory hours"
      ],
      "careers": [
        "Medical Laboratory Scientist",
        "Biomedical Scientist",
        "Quality Control Analyst"
      ],
      "annualFeesGhs": 6200,
      "employmentRatePct": 93,
      "salary": {
        "minMonthly": 3200,
        "maxMonthly": 9000
      },
      "cutoffTrend": [
        {
          "year": 2023,
          "aggregate": 13
        },
        {
          "year": 2024,
          "aggregate": 12
        },
        {
          "year": 2025,
          "aggregate": 12
        }
      ],
      "requirements": {
        "minimumAggregate": 12,
        "coreSubjects": [
          {
            "subject": "English Language",
            "minimumGrade": "C6"
          },
          {
            "subject": "Core Mathematics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [
          {
            "subject": "Chemistry",
            "minimumGrade": "C6"
          },
          {
            "subject": "Biology",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Cut-off shown is the first-choice aggregate published by the University of Ghana.",
          "Fees and salary figures are indicative estimates, not official."
        ]
      },
      "provenance": {
        "source": "University of Ghana — Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-medicine",
      "name": "Medicine & Surgery",
      "universityId": "ug",
      "faculty": "School of Medicine and Dentistry",
      "degreeType": "MBChB",
      "durationYears": 6,
      "campus": "Accra (Korle Bu)",
      "region": "Greater Accra",
      "overview": "The MBChB at the University of Ghana Medical School combines pre-clinical sciences with hospital-based clinical rotations at Korle Bu Teaching Hospital. It is among the most competitive programmes in the country.",
      "pros": [
        "Highest earning potential",
        "Respected profession",
        "Near-certain employment"
      ],
      "cons": [
        "Extremely competitive cut-off",
        "Six-year commitment",
        "Demanding clinical rotations"
      ],
      "careers": [
        "Medical Doctor",
        "Surgeon",
        "Public Health Specialist"
      ],
      "annualFeesGhs": 8600,
      "employmentRatePct": 99,
      "salary": {
        "minMonthly": 8000,
        "maxMonthly": 25000
      },
      "cutoffTrend": [
        {
          "year": 2022,
          "aggregate": 8
        },
        {
          "year": 2023,
          "aggregate": 8
        },
        {
          "year": 2024,
          "aggregate": 8
        },
        {
          "year": 2025,
          "aggregate": 8
        }
      ],
      "requirements": {
        "minimumAggregate": 8,
        "coreSubjects": [
          {
            "subject": "English Language",
            "minimumGrade": "C6"
          },
          {
            "subject": "Core Mathematics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [
          {
            "subject": "Biology",
            "minimumGrade": "C6"
          },
          {
            "subject": "Chemistry",
            "minimumGrade": "C6"
          },
          {
            "subject": "Physics",
            "alternatives": [
              "Elective Mathematics"
            ],
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Cut-off shown is the first-choice aggregate published by the University of Ghana.",
          "Fees and salary figures are indicative estimates, not official."
        ]
      },
      "provenance": {
        "source": "University of Ghana — Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-nursing",
      "name": "Nursing",
      "universityId": "ug",
      "faculty": "School of Nursing and Midwifery",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "overview": "Nursing at the University of Ghana blends anatomy, pharmacology and supervised clinical placements, preparing graduates for registered practice across hospital and community settings.",
      "pros": [
        "Strong job security",
        "International opportunities",
        "Clinical placements early"
      ],
      "cons": [
        "Physically demanding rotations",
        "Shift work"
      ],
      "careers": [
        "Registered Nurse",
        "Community Health Officer",
        "Nurse Educator"
      ],
      "annualFeesGhs": 4200,
      "employmentRatePct": 96,
      "salary": {
        "minMonthly": 2500,
        "maxMonthly": 6500
      },
      "cutoffTrend": [
        {
          "year": 2023,
          "aggregate": 14
        },
        {
          "year": 2024,
          "aggregate": 15
        },
        {
          "year": 2025,
          "aggregate": 15
        }
      ],
      "requirements": {
        "minimumAggregate": 15,
        "coreSubjects": [
          {
            "subject": "English Language",
            "minimumGrade": "C6"
          },
          {
            "subject": "Core Mathematics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [
          {
            "subject": "Biology",
            "minimumGrade": "C6"
          },
          {
            "subject": "Chemistry",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Cut-off shown is the first-choice aggregate published by the University of Ghana.",
          "Fees and salary figures are indicative estimates, not official."
        ]
      },
      "provenance": {
        "source": "University of Ghana — Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-pharmacy",
      "name": "Pharmacy",
      "universityId": "ug",
      "faculty": "School of Pharmacy",
      "degreeType": "PharmD",
      "durationYears": 6,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "overview": "The Doctor of Pharmacy programme trains pharmacists in pharmacology, pharmaceutics and clinical practice, with supervised placements in hospital and community pharmacies.",
      "pros": [
        "Strong professional standing",
        "Reliable employment",
        "Community and hospital routes"
      ],
      "cons": [
        "Six-year programme",
        "Competitive entry",
        "Heavy chemistry load"
      ],
      "careers": [
        "Pharmacist",
        "Clinical Pharmacist",
        "Regulatory Affairs Officer"
      ],
      "annualFeesGhs": 7200,
      "employmentRatePct": 96,
      "salary": {
        "minMonthly": 5000,
        "maxMonthly": 14000
      },
      "cutoffTrend": [
        {
          "year": 2023,
          "aggregate": 11
        },
        {
          "year": 2024,
          "aggregate": 10
        },
        {
          "year": 2025,
          "aggregate": 10
        }
      ],
      "requirements": {
        "minimumAggregate": 10,
        "coreSubjects": [
          {
            "subject": "English Language",
            "minimumGrade": "C6"
          },
          {
            "subject": "Core Mathematics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [
          {
            "subject": "Chemistry",
            "minimumGrade": "C6"
          },
          {
            "subject": "Biology",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Cut-off shown is the first-choice aggregate published by the University of Ghana.",
          "Fees and salary figures are indicative estimates, not official."
        ]
      },
      "provenance": {
        "source": "University of Ghana — Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-psychology",
      "name": "Psychology",
      "universityId": "ug",
      "faculty": "School of Social Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "overview": "Psychology at Legon covers cognitive, social, developmental and clinical psychology with research methods and statistics, feeding into counselling, human resources and postgraduate clinical training.",
      "pros": [
        "Broad applicability",
        "Growing mental health sector",
        "Research skills"
      ],
      "cons": [
        "Clinical practice needs postgraduate study",
        "Statistics-heavy"
      ],
      "careers": [
        "Counselling Psychologist",
        "Human Resource Officer",
        "Research Analyst"
      ],
      "annualFeesGhs": 4400,
      "employmentRatePct": 82,
      "salary": {
        "minMonthly": 2400,
        "maxMonthly": 7500
      },
      "cutoffTrend": [
        {
          "year": 2023,
          "aggregate": 16
        },
        {
          "year": 2024,
          "aggregate": 15
        },
        {
          "year": 2025,
          "aggregate": 15
        }
      ],
      "requirements": {
        "minimumAggregate": 15,
        "coreSubjects": [
          {
            "subject": "English Language",
            "minimumGrade": "C6"
          },
          {
            "subject": "Core Mathematics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "Cut-off shown is the first-choice aggregate published by the University of Ghana.",
          "Fees and salary figures are indicative estimates, not official."
        ]
      },
      "provenance": {
        "source": "University of Ghana — Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-public-health",
      "name": "Public Health",
      "universityId": "ug",
      "faculty": "School of Public Health",
      "degreeType": "BPH",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "overview": "Bachelor of Public Health covers epidemiology, health promotion, biostatistics and health policy, preparing graduates to work in population health across government and NGOs.",
      "pros": [
        "Policy and NGO pathways",
        "Epidemiology skills in demand",
        "Strong postgraduate options"
      ],
      "cons": [
        "Competitive cut-off",
        "Less clinical contact than medicine"
      ],
      "careers": [
        "Public Health Officer",
        "Epidemiologist",
        "Health Programme Manager"
      ],
      "annualFeesGhs": 5400,
      "employmentRatePct": 87,
      "salary": {
        "minMonthly": 3000,
        "maxMonthly": 10000
      },
      "cutoffTrend": [
        {
          "year": 2023,
          "aggregate": 10
        },
        {
          "year": 2024,
          "aggregate": 9
        },
        {
          "year": 2025,
          "aggregate": 9
        }
      ],
      "requirements": {
        "minimumAggregate": 9,
        "coreSubjects": [
          {
            "subject": "English Language",
            "minimumGrade": "C6"
          },
          {
            "subject": "Core Mathematics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [
          {
            "subject": "Biology",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Cut-off shown is the first-choice aggregate published by the University of Ghana.",
          "Fees and salary figures are indicative estimates, not official."
        ]
      },
      "provenance": {
        "source": "University of Ghana — Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "uhas-allied-health",
      "name": "Medical Laboratory Technology",
      "universityId": "uhas",
      "faculty": "School of Allied Health Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Ho",
      "region": "Volta",
      "overview": "UHAS was established specifically for health training, and its Medical Laboratory Technology programme covers diagnostics, microbiology and clinical chemistry with hospital placements.",
      "pros": [
        "Health-focused university",
        "Strong diagnostic sector demand",
        "Regional access"
      ],
      "cons": [
        "Volta region relocation for many students",
        "Laboratory-intensive"
      ],
      "careers": [
        "Laboratory Technologist",
        "Biomedical Scientist",
        "Public Health Analyst"
      ],
      "annualFeesGhs": 3800,
      "employmentRatePct": 91,
      "salary": {
        "minMonthly": 2800,
        "maxMonthly": 8000
      },
      "cutoffTrend": [
        {
          "year": 2024,
          "aggregate": 18
        },
        {
          "year": 2025,
          "aggregate": 17
        }
      ],
      "requirements": {
        "minimumAggregate": 17,
        "coreSubjects": [
          {
            "subject": "English Language",
            "minimumGrade": "C6"
          },
          {
            "subject": "Core Mathematics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [
          {
            "subject": "Biology",
            "minimumGrade": "C6"
          },
          {
            "subject": "Chemistry",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Cut-off not yet verified against a UHAS publication; treat as indicative.",
          "Fees and salary figures are indicative estimates, not official."
        ]
      },
      "provenance": {
        "source": "UniMatch seed estimate — not verified against a university publication",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "upsa-marketing",
      "name": "Marketing",
      "universityId": "upsa",
      "faculty": "Faculty of Management Studies",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra",
      "region": "Greater Accra",
      "overview": "UPSA's Marketing degree focuses on professional practice, combining consumer behaviour, digital marketing and brand management with the professional certifications UPSA is known for.",
      "pros": [
        "Professional-practice focus",
        "Accra location",
        "Industry certifications"
      ],
      "cons": [
        "Saturated graduate market",
        "Higher fees than public peers"
      ],
      "careers": [
        "Marketing Executive",
        "Brand Manager",
        "Digital Marketer"
      ],
      "annualFeesGhs": 4600,
      "employmentRatePct": 83,
      "salary": {
        "minMonthly": 2400,
        "maxMonthly": 8500
      },
      "cutoffTrend": [
        {
          "year": 2024,
          "aggregate": 20
        },
        {
          "year": 2025,
          "aggregate": 19
        }
      ],
      "requirements": {
        "minimumAggregate": 19,
        "coreSubjects": [
          {
            "subject": "English Language",
            "minimumGrade": "C6"
          },
          {
            "subject": "Core Mathematics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Social Studies",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [
          {
            "subject": "Business Management",
            "alternatives": [
              "Economics",
              "Financial Accounting"
            ],
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Cut-off not yet verified against a UPSA publication; treat as indicative.",
          "Fees and salary figures are indicative estimates, not official."
        ]
      },
      "provenance": {
        "source": "UniMatch seed estimate — not verified against a university publication",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    }
  ],
  "deadlines": [
    {
      "id": "knust-all",
      "universityId": "knust",
      "scope": "All Programmes",
      "closesOn": "2026-09-30",
      "provenance": {
        "source": "KNUST undergraduate admissions cycle (typical closing date; confirm on the portal)",
        "sourceUrl": "https://apps.knust.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "ucc-all",
      "universityId": "ucc",
      "scope": "All Programmes",
      "closesOn": "2026-09-15",
      "provenance": {
        "source": "University of Cape Coast admissions cycle (typical; confirm on the portal)",
        "sourceUrl": "https://admission.ucc.edu.gh",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-health-sciences",
      "universityId": "uds",
      "scope": "Health Sciences",
      "closesOn": "2026-08-21",
      "provenance": {
        "source": "UDS health sciences deadline (typical; confirm on the portal)",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uew-education",
      "universityId": "uew",
      "scope": "Education Programmes",
      "closesOn": "2026-07-31",
      "provenance": {
        "source": "UEW education programmes deadline (typical; confirm on the portal)",
        "sourceUrl": "https://uew.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "ug-all",
      "universityId": "ug",
      "scope": "All Other Programmes",
      "closesOn": "2026-10-15",
      "provenance": {
        "source": "University of Ghana general admissions deadline (typical; confirm on the portal)",
        "sourceUrl": "https://admission.ug.edu.gh",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "ug-medicine-law",
      "universityId": "ug",
      "scope": "Medicine & Law",
      "closesOn": "2026-08-31",
      "provenance": {
        "source": "University of Ghana restricted-programme deadline (typical; confirm on the portal)",
        "sourceUrl": "https://admission.ug.edu.gh",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uhas-allied-health",
      "universityId": "uhas",
      "scope": "Allied Health",
      "closesOn": "2026-09-18",
      "provenance": {
        "source": "UHAS allied health deadline (typical; confirm on the portal)",
        "sourceUrl": "https://uhas.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "upsa-all",
      "universityId": "upsa",
      "scope": "All Programmes",
      "closesOn": "2026-09-25",
      "provenance": {
        "source": "UPSA admissions cycle (typical; confirm on the portal)",
        "sourceUrl": "https://upsa.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    }
  ]
} as const
