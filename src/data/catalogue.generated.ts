/**
 * GENERATED FILE, DO NOT EDIT BY HAND.
 *
 * Produced by scripts/data-pipeline.ts from data/seed/ and data/imports/.
 * Run `npm run data:build` to regenerate.
 */
import type { Catalogue } from '../domain/catalogue/types'

export const catalogue: Catalogue = {
  "universities": [
    {
      "id": "academic-city",
      "name": "Academic City University",
      "shortName": "Academic City",
      "city": "Haatso, Accra",
      "region": "Greater Accra",
      "admissionsUrl": "https://acity.edu.gh/admissions"
    },
    {
      "id": "all-nations",
      "name": "All Nations University",
      "shortName": "All Nations",
      "city": "Koforidua",
      "region": "Eastern",
      "admissionsUrl": "https://allnationsuniversity.org/admissions"
    },
    {
      "id": "ashesi",
      "name": "Ashesi University",
      "shortName": "Ashesi",
      "city": "Berekuso",
      "region": "Eastern",
      "admissionsUrl": "https://www.ashesi.edu.gh/admissions"
    },
    {
      "id": "atu",
      "name": "Accra Technical University",
      "shortName": "Accra Technical Univ.",
      "city": "Accra",
      "region": "Greater Accra",
      "admissionsUrl": "https://atu.edu.gh/admissions"
    },
    {
      "id": "catholic",
      "name": "Catholic University of Ghana",
      "shortName": "Catholic University",
      "city": "Fiapre, Sunyani",
      "region": "Bono",
      "admissionsUrl": "https://cug.edu.gh/admissions"
    },
    {
      "id": "central",
      "name": "Central University",
      "shortName": "Central University",
      "city": "Miotso",
      "region": "Greater Accra",
      "admissionsUrl": "https://central.edu.gh/admissions"
    },
    {
      "id": "gctu",
      "name": "Ghana Communication Technology University",
      "shortName": "GCTU",
      "city": "Tesano, Accra",
      "region": "Greater Accra",
      "admissionsUrl": "https://gctu.edu.gh/admissions"
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
      "id": "methodist",
      "name": "Methodist University Ghana",
      "shortName": "Methodist",
      "city": "Dansoman, Accra",
      "region": "Greater Accra",
      "admissionsUrl": "https://mucg.edu.gh/admissions"
    },
    {
      "id": "pentecost",
      "name": "Pentecost University",
      "shortName": "Pentecost",
      "city": "Sowutuom, Accra",
      "region": "Greater Accra",
      "admissionsUrl": "https://pentvars.edu.gh/admissions"
    },
    {
      "id": "regent",
      "name": "Regent University College of Science and Technology",
      "shortName": "Regent",
      "city": "McCarthy Hill, Accra",
      "region": "Greater Accra",
      "admissionsUrl": "https://regent.edu.gh/admissions"
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
    },
    {
      "id": "valley-view",
      "name": "Valley View University",
      "shortName": "Valley View",
      "city": "Oyibi",
      "region": "Greater Accra",
      "admissionsUrl": "https://vvu.edu.gh/admissions"
    },
    {
      "id": "wisconsin",
      "name": "Wisconsin International University College",
      "shortName": "Wisconsin",
      "city": "North Legon, Accra",
      "region": "Greater Accra",
      "admissionsUrl": "https://wiuc-ghana.edu.gh/admissions"
    }
  ],
  "programmes": [
    {
      "id": "academic-city-business-administration",
      "name": "Business Administration",
      "universityId": "academic-city",
      "faculty": "School of Business",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Haatso, Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Academic City University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://acity.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "academic-city-computer-engineering",
      "name": "Computer Engineering",
      "universityId": "academic-city",
      "faculty": "School of Engineering",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Haatso, Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          }
        ],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Academic City University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://acity.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "academic-city-computer-science",
      "name": "Computer Science",
      "universityId": "academic-city",
      "faculty": "School of Computing and Information Technology",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Haatso, Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Academic City University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://acity.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "academic-city-electrical-and-electronic-engineering",
      "name": "Electrical and Electronic Engineering",
      "universityId": "academic-city",
      "faculty": "School of Engineering",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Haatso, Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          }
        ],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Academic City University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://acity.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "academic-city-information-technology",
      "name": "Information Technology",
      "universityId": "academic-city",
      "faculty": "School of Computing and Information Technology",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Haatso, Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Academic City University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://acity.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "academic-city-management-and-entrepreneurship",
      "name": "Management and Entrepreneurship",
      "universityId": "academic-city",
      "faculty": "School of Business",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Haatso, Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Academic City University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://acity.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "academic-city-mechanical-engineering",
      "name": "Mechanical Engineering",
      "universityId": "academic-city",
      "faculty": "School of Engineering",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Haatso, Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          }
        ],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Academic City University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://acity.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "all-nations-biomedical-engineering",
      "name": "Biomedical Engineering",
      "universityId": "all-nations",
      "faculty": "Faculty of Engineering and Computer Science",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Koforidua",
      "region": "Eastern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Elective Mathematics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Physics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "All Nations University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://allnationsuniversity.org/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "all-nations-business-administration",
      "name": "Business Administration",
      "universityId": "all-nations",
      "faculty": "Faculty of Business Administration",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Koforidua",
      "region": "Eastern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "All Nations University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://allnationsuniversity.org/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "all-nations-computer-science",
      "name": "Computer Science",
      "universityId": "all-nations",
      "faculty": "Faculty of Engineering and Computer Science",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Koforidua",
      "region": "Eastern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "All Nations University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://allnationsuniversity.org/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "all-nations-electronics-and-communication-engineering",
      "name": "Electronics and Communication Engineering",
      "universityId": "all-nations",
      "faculty": "Faculty of Engineering and Computer Science",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Koforidua",
      "region": "Eastern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Elective Mathematics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Physics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "All Nations University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://allnationsuniversity.org/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "all-nations-nursing",
      "name": "Nursing",
      "universityId": "all-nations",
      "faculty": "Faculty of Health Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Koforidua",
      "region": "Eastern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "All Nations University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://allnationsuniversity.org/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "all-nations-theology",
      "name": "Theology",
      "universityId": "all-nations",
      "faculty": "Faculty of Theology",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Koforidua",
      "region": "Eastern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "All Nations University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://allnationsuniversity.org/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "ashesi-business-administration",
      "name": "Business Administration",
      "universityId": "ashesi",
      "faculty": "Faculty of Business Administration",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Berekuso",
      "region": "Eastern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 14,
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Ashesi University programme catalogue. Ashesi admits holistically rather than by a published aggregate cut-off; the figures shown are indicative only and it is among the most selective institutions in Ghana.",
        "sourceUrl": "https://www.ashesi.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "ashesi-computer-engineering",
      "name": "Computer Engineering",
      "universityId": "ashesi",
      "faculty": "Faculty of Engineering",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Berekuso",
      "region": "Eastern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Elective Mathematics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Physics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Ashesi University programme catalogue. Ashesi admits holistically rather than by a published aggregate cut-off; the figures shown are indicative only and it is among the most selective institutions in Ghana.",
        "sourceUrl": "https://www.ashesi.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "ashesi-computer-science",
      "name": "Computer Science",
      "universityId": "ashesi",
      "faculty": "Faculty of Computing and Information Systems",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Berekuso",
      "region": "Eastern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Elective Mathematics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Ashesi University programme catalogue. Ashesi admits holistically rather than by a published aggregate cut-off; the figures shown are indicative only and it is among the most selective institutions in Ghana.",
        "sourceUrl": "https://www.ashesi.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "ashesi-economics",
      "name": "Economics",
      "universityId": "ashesi",
      "faculty": "Faculty of Business Administration",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Berekuso",
      "region": "Eastern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 14,
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
            "subject": "Economics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Ashesi University programme catalogue. Ashesi admits holistically rather than by a published aggregate cut-off; the figures shown are indicative only and it is among the most selective institutions in Ghana.",
        "sourceUrl": "https://www.ashesi.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "ashesi-electrical-and-electronic-engineering",
      "name": "Electrical and Electronic Engineering",
      "universityId": "ashesi",
      "faculty": "Faculty of Engineering",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Berekuso",
      "region": "Eastern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Elective Mathematics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Physics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Ashesi University programme catalogue. Ashesi admits holistically rather than by a published aggregate cut-off; the figures shown are indicative only and it is among the most selective institutions in Ghana.",
        "sourceUrl": "https://www.ashesi.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "ashesi-law-with-public-policy",
      "name": "Law with Public Policy",
      "universityId": "ashesi",
      "faculty": "Faculty of Humanities and Social Sciences",
      "degreeType": "LLB",
      "durationYears": 4,
      "campus": "Berekuso",
      "region": "Eastern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 14,
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Ashesi University programme catalogue. Ashesi admits holistically rather than by a published aggregate cut-off; the figures shown are indicative only and it is among the most selective institutions in Ghana.",
        "sourceUrl": "https://www.ashesi.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "ashesi-management-information-systems",
      "name": "Management Information Systems",
      "universityId": "ashesi",
      "faculty": "Faculty of Computing and Information Systems",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Berekuso",
      "region": "Eastern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 14,
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Ashesi University programme catalogue. Ashesi admits holistically rather than by a published aggregate cut-off; the figures shown are indicative only and it is among the most selective institutions in Ghana.",
        "sourceUrl": "https://www.ashesi.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "ashesi-mechanical-engineering",
      "name": "Mechanical Engineering",
      "universityId": "ashesi",
      "faculty": "Faculty of Engineering",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Berekuso",
      "region": "Eastern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Elective Mathematics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Physics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Ashesi University programme catalogue. Ashesi admits holistically rather than by a published aggregate cut-off; the figures shown are indicative only and it is among the most selective institutions in Ghana.",
        "sourceUrl": "https://www.ashesi.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "ashesi-mechatronic-engineering",
      "name": "Mechatronic Engineering",
      "universityId": "ashesi",
      "faculty": "Faculty of Engineering",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Berekuso",
      "region": "Eastern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Elective Mathematics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Physics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Ashesi University programme catalogue. Ashesi admits holistically rather than by a published aggregate cut-off; the figures shown are indicative only and it is among the most selective institutions in Ghana.",
        "sourceUrl": "https://www.ashesi.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "atu-accounting-with-computing",
      "name": "Accounting with Computing",
      "universityId": "atu",
      "faculty": "Faculty of Business",
      "degreeType": "BTech",
      "durationYears": 4,
      "campus": "Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Accra Technical University programme catalogue. No published per-programme cut-off list was found; these are estimates.",
        "sourceUrl": "https://atu.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "atu-civil-engineering",
      "name": "Civil Engineering",
      "universityId": "atu",
      "faculty": "Faculty of Engineering",
      "degreeType": "BTech",
      "durationYears": 4,
      "campus": "Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
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
          }
        ],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Accra Technical University programme catalogue. No published per-programme cut-off list was found; these are estimates.",
        "sourceUrl": "https://atu.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "atu-computer-science",
      "name": "Computer Science",
      "universityId": "atu",
      "faculty": "Faculty of Applied Sciences",
      "degreeType": "BTech",
      "durationYears": 4,
      "campus": "Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Accra Technical University programme catalogue. No published per-programme cut-off list was found; these are estimates.",
        "sourceUrl": "https://atu.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "atu-electrical-and-electronic-engineering",
      "name": "Electrical and Electronic Engineering",
      "universityId": "atu",
      "faculty": "Faculty of Engineering",
      "degreeType": "BTech",
      "durationYears": 4,
      "campus": "Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
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
          }
        ],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Accra Technical University programme catalogue. No published per-programme cut-off list was found; these are estimates.",
        "sourceUrl": "https://atu.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "atu-fashion-design-and-textiles",
      "name": "Fashion Design and Textiles",
      "universityId": "atu",
      "faculty": "Faculty of Applied Arts",
      "degreeType": "BTech",
      "durationYears": 4,
      "campus": "Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 26,
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Accra Technical University programme catalogue. No published per-programme cut-off list was found; these are estimates.",
        "sourceUrl": "https://atu.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "atu-hospitality-management",
      "name": "Hospitality Management",
      "universityId": "atu",
      "faculty": "Faculty of Applied Sciences",
      "degreeType": "BTech",
      "durationYears": 4,
      "campus": "Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Accra Technical University programme catalogue. No published per-programme cut-off list was found; these are estimates.",
        "sourceUrl": "https://atu.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "atu-hospitality-management-2",
      "name": "Hospitality Management",
      "universityId": "atu",
      "faculty": "Faculty of Applied Sciences",
      "degreeType": "Diploma",
      "durationYears": 2,
      "campus": "Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "diploma",
      "requirements": {
        "minimumAggregate": 30,
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Accra Technical University programme catalogue. No published per-programme cut-off list was found; these are estimates.",
        "sourceUrl": "https://atu.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "atu-marketing",
      "name": "Marketing",
      "universityId": "atu",
      "faculty": "Faculty of Business",
      "degreeType": "BTech",
      "durationYears": 4,
      "campus": "Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Accra Technical University programme catalogue. No published per-programme cut-off list was found; these are estimates.",
        "sourceUrl": "https://atu.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "atu-mechanical-engineering",
      "name": "Mechanical Engineering",
      "universityId": "atu",
      "faculty": "Faculty of Engineering",
      "degreeType": "BTech",
      "durationYears": 4,
      "campus": "Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
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
          }
        ],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Accra Technical University programme catalogue. No published per-programme cut-off list was found; these are estimates.",
        "sourceUrl": "https://atu.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "atu-statistics",
      "name": "Statistics",
      "universityId": "atu",
      "faculty": "Faculty of Applied Sciences",
      "degreeType": "BTech",
      "durationYears": 4,
      "campus": "Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Accra Technical University programme catalogue. No published per-programme cut-off list was found; these are estimates.",
        "sourceUrl": "https://atu.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "catholic-business-administration",
      "name": "Business Administration",
      "universityId": "catholic",
      "faculty": "Faculty of Economics and Business Administration",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Fiapre, Sunyani",
      "region": "Bono",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Catholic University of Ghana programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://cug.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "catholic-economics",
      "name": "Economics",
      "universityId": "catholic",
      "faculty": "Faculty of Economics and Business Administration",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Fiapre, Sunyani",
      "region": "Bono",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [
          {
            "subject": "Economics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Catholic University of Ghana programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://cug.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "catholic-education",
      "name": "Education",
      "universityId": "catholic",
      "faculty": "Faculty of Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Fiapre, Sunyani",
      "region": "Bono",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Catholic University of Ghana programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://cug.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "catholic-information-technology",
      "name": "Information Technology",
      "universityId": "catholic",
      "faculty": "Faculty of Information Technology",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Fiapre, Sunyani",
      "region": "Bono",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Catholic University of Ghana programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://cug.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "catholic-nursing",
      "name": "Nursing",
      "universityId": "catholic",
      "faculty": "Faculty of Health Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Fiapre, Sunyani",
      "region": "Bono",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Catholic University of Ghana programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://cug.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "catholic-religious-studies",
      "name": "Religious Studies",
      "universityId": "catholic",
      "faculty": "Faculty of Religious Studies",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Fiapre, Sunyani",
      "region": "Bono",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Catholic University of Ghana programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://cug.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "central-accounting",
      "name": "Accounting",
      "universityId": "central",
      "faculty": "School of Business",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Miotso",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [
          {
            "subject": "Financial Accounting",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Central University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://central.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "central-banking-and-finance",
      "name": "Banking and Finance",
      "universityId": "central",
      "faculty": "School of Business",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Miotso",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Central University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://central.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "central-business-administration",
      "name": "Business Administration",
      "universityId": "central",
      "faculty": "School of Business",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Miotso",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Central University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://central.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "central-business-administration-distance",
      "name": "Business Administration",
      "universityId": "central",
      "faculty": "School of Business",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Miotso",
      "region": "Greater Accra",
      "admissionTrack": "distance",
      "qualificationLevel": "degree",
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
          "Distance-learning intake, which has its own cut-off.",
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Central University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://central.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "central-communication-studies",
      "name": "Communication Studies",
      "universityId": "central",
      "faculty": "Faculty of Arts and Social Sciences",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Miotso",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Central University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://central.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "central-human-resource-management",
      "name": "Human Resource Management",
      "universityId": "central",
      "faculty": "School of Business",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Miotso",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Central University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://central.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "central-information-technology",
      "name": "Information Technology",
      "universityId": "central",
      "faculty": "Faculty of Applied Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Miotso",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Central University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://central.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "central-law",
      "name": "Law",
      "universityId": "central",
      "faculty": "Faculty of Law",
      "degreeType": "LLB",
      "durationYears": 4,
      "campus": "Miotso",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Central University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://central.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "central-marketing",
      "name": "Marketing",
      "universityId": "central",
      "faculty": "School of Business",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Miotso",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Central University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://central.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "central-nursing",
      "name": "Nursing",
      "universityId": "central",
      "faculty": "School of Medicine and Health Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Miotso",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Central University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://central.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "central-pharmacy",
      "name": "Pharmacy",
      "universityId": "central",
      "faculty": "School of Pharmacy",
      "degreeType": "PharmD",
      "durationYears": 6,
      "campus": "Miotso",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 16,
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
            "subject": "Chemistry",
            "minimumGrade": "C6"
          },
          {
            "subject": "Biology",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Central University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://central.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "central-physician-assistantship",
      "name": "Physician Assistantship",
      "universityId": "central",
      "faculty": "School of Medicine and Health Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Miotso",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [
          {
            "subject": "Biology",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Central University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://central.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "central-theology",
      "name": "Theology",
      "universityId": "central",
      "faculty": "School of Theology, Mission and Leadership",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Miotso",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Central University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://central.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "gctu-accounting",
      "name": "Accounting",
      "universityId": "gctu",
      "faculty": "Faculty of Business",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tesano, Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [
          {
            "subject": "Financial Accounting",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Ghana Communication Technology University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://gctu.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "gctu-business-administration",
      "name": "Business Administration",
      "universityId": "gctu",
      "faculty": "Faculty of Business",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tesano, Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Ghana Communication Technology University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://gctu.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "gctu-computer-science",
      "name": "Computer Science",
      "universityId": "gctu",
      "faculty": "Faculty of Computing and Information Systems",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tesano, Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Ghana Communication Technology University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://gctu.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "gctu-cybersecurity",
      "name": "Cybersecurity",
      "universityId": "gctu",
      "faculty": "Faculty of Computing and Information Systems",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tesano, Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Ghana Communication Technology University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://gctu.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "gctu-electrical-and-electronic-engineering",
      "name": "Electrical and Electronic Engineering",
      "universityId": "gctu",
      "faculty": "Faculty of Engineering",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tesano, Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Elective Mathematics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Physics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Ghana Communication Technology University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://gctu.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "gctu-information-technology",
      "name": "Information Technology",
      "universityId": "gctu",
      "faculty": "Faculty of Computing and Information Systems",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tesano, Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Ghana Communication Technology University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://gctu.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "gctu-information-technology-distance",
      "name": "Information Technology",
      "universityId": "gctu",
      "faculty": "Faculty of Computing and Information Systems",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tesano, Accra",
      "region": "Greater Accra",
      "admissionTrack": "distance",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "Distance-learning intake, which has its own cut-off.",
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Ghana Communication Technology University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://gctu.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "gctu-telecommunications-engineering",
      "name": "Telecommunications Engineering",
      "universityId": "gctu",
      "faculty": "Faculty of Engineering",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tesano, Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Elective Mathematics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Physics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Ghana Communication Technology University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://gctu.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "knust-actuarial-science",
      "name": "Actuarial Science",
      "universityId": "knust",
      "faculty": "College of Science",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 13,
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-aerospace-engineering",
      "name": "Aerospace Engineering",
      "universityId": "knust",
      "faculty": "College of Engineering",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Elective Mathematics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Physics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
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
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 14,
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-agricultural-biotechnology",
      "name": "Agricultural Biotechnology",
      "universityId": "knust",
      "faculty": "College of Agriculture and Natural Resources",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-agricultural-engineering",
      "name": "Agricultural Engineering",
      "universityId": "knust",
      "faculty": "College of Engineering",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 23,
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
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
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-akan",
      "name": "Akan",
      "universityId": "knust",
      "faculty": "Faculty of Arts",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 23,
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-aquaculture-and-water-resource-management",
      "name": "Aquaculture and Water Resource Management",
      "universityId": "knust",
      "faculty": "College of Agriculture and Natural Resources",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 23,
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-architecture",
      "name": "Architecture",
      "universityId": "knust",
      "faculty": "College of Art and Built Environment",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 13,
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-biochemistry",
      "name": "Biochemistry",
      "universityId": "knust",
      "faculty": "College of Science",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Chemistry",
            "minimumGrade": "C6"
          },
          {
            "subject": "Biology",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-biological-science",
      "name": "Biological Science",
      "universityId": "knust",
      "faculty": "College of Science",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
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
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Elective Mathematics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Physics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-business-administration",
      "name": "Business Administration",
      "universityId": "knust",
      "faculty": "KNUST School of Business",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-chemical-engineering",
      "name": "Chemical Engineering",
      "universityId": "knust",
      "faculty": "College of Engineering",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 14,
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
            "subject": "Chemistry",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-chemistry",
      "name": "Chemistry",
      "universityId": "knust",
      "faculty": "College of Science",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Chemistry",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-civil-engineering",
      "name": "Civil Engineering",
      "universityId": "knust",
      "faculty": "College of Engineering",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 14,
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
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-communication-design-graphic-design",
      "name": "Communication Design (Graphic Design)",
      "universityId": "knust",
      "faculty": "College of Art and Built Environment",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
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
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "minimumGrade": "C6"
          },
          {
            "subject": "Physics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-computer-science",
      "name": "Computer Science",
      "universityId": "knust",
      "faculty": "College of Science",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Elective Mathematics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-construction-technology-and-management",
      "name": "Construction Technology and Management",
      "universityId": "knust",
      "faculty": "College of Art and Built Environment",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-culture-and-tourism",
      "name": "Culture and Tourism",
      "universityId": "knust",
      "faculty": "Faculty of Arts",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-dairy-and-meat-science-and-technology",
      "name": "Dairy and Meat Science and Technology",
      "universityId": "knust",
      "faculty": "College of Agriculture and Natural Resources",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 23,
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-dental-surgery-fee-paying",
      "name": "Dental Surgery",
      "universityId": "knust",
      "faculty": "College of Health Sciences",
      "degreeType": "BDS",
      "durationYears": 6,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "fee-paying",
      "qualificationLevel": "degree",
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
          }
        ],
        "notes": [
          "Full-fee-paying admission. The regular-track cut-off is lower.",
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-development-planning",
      "name": "Development Planning",
      "universityId": "knust",
      "faculty": "College of Art and Built Environment",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-disability-and-rehabilitation-studies",
      "name": "Disability and Rehabilitation Studies",
      "universityId": "knust",
      "faculty": "College of Health Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-economics",
      "name": "Economics",
      "universityId": "knust",
      "faculty": "Faculty of Social Sciences",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-electrical-and-electronic-engineering",
      "name": "Electrical and Electronic Engineering",
      "universityId": "knust",
      "faculty": "College of Engineering",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Elective Mathematics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Physics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-english",
      "name": "English",
      "universityId": "knust",
      "faculty": "Faculty of Arts",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-environmental-science",
      "name": "Environmental Science",
      "universityId": "knust",
      "faculty": "College of Science",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-food-science-and-technology",
      "name": "Food Science and Technology",
      "universityId": "knust",
      "faculty": "College of Science",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Chemistry",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-forest-resources-technology",
      "name": "Forest Resources Technology",
      "universityId": "knust",
      "faculty": "College of Agriculture and Natural Resources",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 23,
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-french",
      "name": "French",
      "universityId": "knust",
      "faculty": "Faculty of Arts",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 16,
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-geography-and-rural-development",
      "name": "Geography and Rural Development",
      "universityId": "knust",
      "faculty": "Faculty of Social Sciences",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 16,
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-geological-engineering",
      "name": "Geological Engineering",
      "universityId": "knust",
      "faculty": "College of Engineering",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-geomatic-geodetic-engineering",
      "name": "Geomatic (Geodetic) Engineering",
      "universityId": "knust",
      "faculty": "College of Engineering",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-herbal-medicine",
      "name": "Herbal Medicine",
      "universityId": "knust",
      "faculty": "College of Health Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-history",
      "name": "History",
      "universityId": "knust",
      "faculty": "Faculty of Arts",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-human-biology-medicine",
      "name": "Human Biology (Medicine)",
      "universityId": "knust",
      "faculty": "College of Health Sciences",
      "degreeType": "MBChB",
      "durationYears": 6,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Biology",
            "minimumGrade": "C6"
          },
          {
            "subject": "Chemistry",
            "minimumGrade": "C6"
          },
          {
            "subject": "Physics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-human-settlement-planning",
      "name": "Human Settlement Planning",
      "universityId": "knust",
      "faculty": "College of Art and Built Environment",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-industrial-art",
      "name": "Industrial Art",
      "universityId": "knust",
      "faculty": "College of Art and Built Environment",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-integrated-rural-art-and-industry",
      "name": "Integrated Rural Art and Industry",
      "universityId": "knust",
      "faculty": "College of Art and Built Environment",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-land-economy",
      "name": "Land Economy",
      "universityId": "knust",
      "faculty": "College of Art and Built Environment",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 13,
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-landscape-design-and-management",
      "name": "Landscape Design and Management",
      "universityId": "knust",
      "faculty": "College of Agriculture and Natural Resources",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-law",
      "name": "Law",
      "universityId": "knust",
      "faculty": "Faculty of Law",
      "degreeType": "LLB",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-materials-engineering",
      "name": "Materials Engineering",
      "universityId": "knust",
      "faculty": "College of Engineering",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Elective Mathematics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-mathematics",
      "name": "Mathematics",
      "universityId": "knust",
      "faculty": "College of Science",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 23,
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-mechanical-engineering",
      "name": "Mechanical Engineering",
      "universityId": "knust",
      "faculty": "College of Engineering",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 14,
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
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-medical-laboratory-technology",
      "name": "Medical Laboratory Technology",
      "universityId": "knust",
      "faculty": "College of Health Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Chemistry",
            "minimumGrade": "C6"
          },
          {
            "subject": "Biology",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-metallurgical-engineering",
      "name": "Metallurgical Engineering",
      "universityId": "knust",
      "faculty": "College of Engineering",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Elective Mathematics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-meteorology-and-climate-science",
      "name": "Meteorology and Climate Science",
      "universityId": "knust",
      "faculty": "College of Science",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Physics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-midwifery",
      "name": "Midwifery",
      "universityId": "knust",
      "faculty": "College of Health Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Biology",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-natural-resource-management",
      "name": "Natural Resource Management",
      "universityId": "knust",
      "faculty": "College of Agriculture and Natural Resources",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-nursing",
      "name": "Nursing",
      "universityId": "knust",
      "faculty": "College of Health Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-optometry",
      "name": "Optometry",
      "universityId": "knust",
      "faculty": "College of Science",
      "degreeType": "OD",
      "durationYears": 6,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Physics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Biology",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-painting-and-sculpture",
      "name": "Painting and Sculpture",
      "universityId": "knust",
      "faculty": "College of Art and Built Environment",
      "degreeType": "BFA",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-petrochemical-engineering",
      "name": "Petrochemical Engineering",
      "universityId": "knust",
      "faculty": "College of Engineering",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "minimumGrade": "C6"
          },
          {
            "subject": "Chemistry",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-petroleum-engineering",
      "name": "Petroleum Engineering",
      "universityId": "knust",
      "faculty": "College of Engineering",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Elective Mathematics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Physics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-pharmacy",
      "name": "Pharmacy",
      "universityId": "knust",
      "faculty": "College of Health Sciences",
      "degreeType": "PharmD",
      "durationYears": 6,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Chemistry",
            "minimumGrade": "C6"
          },
          {
            "subject": "Biology",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-physics",
      "name": "Physics",
      "universityId": "knust",
      "faculty": "College of Science",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-political-studies",
      "name": "Political Studies",
      "universityId": "knust",
      "faculty": "Faculty of Social Sciences",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 16,
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-post-harvest-technology",
      "name": "Post Harvest Technology",
      "universityId": "knust",
      "faculty": "College of Agriculture and Natural Resources",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-publishing-studies",
      "name": "Publishing Studies",
      "universityId": "knust",
      "faculty": "College of Art and Built Environment",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 14,
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-quantity-surveying-and-construction-economics",
      "name": "Quantity Surveying and Construction Economics",
      "universityId": "knust",
      "faculty": "College of Art and Built Environment",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-real-estate-management",
      "name": "Real Estate Management",
      "universityId": "knust",
      "faculty": "College of Art and Built Environment",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-religious-studies",
      "name": "Religious Studies",
      "universityId": "knust",
      "faculty": "Faculty of Arts",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-social-work",
      "name": "Social Work",
      "universityId": "knust",
      "faculty": "Faculty of Social Sciences",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 16,
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-sociology",
      "name": "Sociology",
      "universityId": "knust",
      "faculty": "Faculty of Social Sciences",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-sonography-fee-paying",
      "name": "Sonography",
      "universityId": "knust",
      "faculty": "College of Health Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "fee-paying",
      "qualificationLevel": "degree",
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
            "subject": "Biology",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Full-fee-paying admission. The regular-track cut-off is lower.",
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-sports-and-exercise-science",
      "name": "Sports and Exercise Science",
      "universityId": "knust",
      "faculty": "College of Health Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-statistics",
      "name": "Statistics",
      "universityId": "knust",
      "faculty": "College of Science",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Elective Mathematics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-telecommunication-engineering",
      "name": "Telecommunication Engineering",
      "universityId": "knust",
      "faculty": "College of Engineering",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 14,
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
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "knust-veterinary-medicine",
      "name": "Veterinary Medicine",
      "universityId": "knust",
      "faculty": "College of Health Sciences",
      "degreeType": "DVM",
      "durationYears": 6,
      "campus": "Kumasi",
      "region": "Ashanti",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 13,
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "KNUST 2026/2027 cut-off points, as reported by O3Schools (secondary source, not the university’s own publication)",
        "sourceUrl": "https://o3schools.com/knust-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "methodist-accounting",
      "name": "Accounting",
      "universityId": "methodist",
      "faculty": "Faculty of Business Administration",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Dansoman, Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [
          {
            "subject": "Financial Accounting",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Methodist University Ghana programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://mucg.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "methodist-business-administration",
      "name": "Business Administration",
      "universityId": "methodist",
      "faculty": "Faculty of Business Administration",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Dansoman, Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Methodist University Ghana programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://mucg.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "methodist-economics",
      "name": "Economics",
      "universityId": "methodist",
      "faculty": "Faculty of Social Studies",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Dansoman, Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [
          {
            "subject": "Economics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Methodist University Ghana programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://mucg.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "methodist-human-resource-management",
      "name": "Human Resource Management",
      "universityId": "methodist",
      "faculty": "Faculty of Business Administration",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Dansoman, Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Methodist University Ghana programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://mucg.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "methodist-information-technology",
      "name": "Information Technology",
      "universityId": "methodist",
      "faculty": "Faculty of Applied Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Dansoman, Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Methodist University Ghana programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://mucg.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "methodist-nursing",
      "name": "Nursing",
      "universityId": "methodist",
      "faculty": "Faculty of Health Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Dansoman, Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Methodist University Ghana programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://mucg.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "methodist-sociology",
      "name": "Sociology",
      "universityId": "methodist",
      "faculty": "Faculty of Social Studies",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Dansoman, Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Methodist University Ghana programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://mucg.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "pentecost-accounting",
      "name": "Accounting",
      "universityId": "pentecost",
      "faculty": "Faculty of Business Administration",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Sowutuom, Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [
          {
            "subject": "Financial Accounting",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Pentecost University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://pentvars.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "pentecost-banking-and-finance",
      "name": "Banking and Finance",
      "universityId": "pentecost",
      "faculty": "Faculty of Business Administration",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Sowutuom, Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Pentecost University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://pentvars.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "pentecost-business-administration",
      "name": "Business Administration",
      "universityId": "pentecost",
      "faculty": "Faculty of Business Administration",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Sowutuom, Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Pentecost University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://pentvars.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "pentecost-computer-science",
      "name": "Computer Science",
      "universityId": "pentecost",
      "faculty": "Faculty of Engineering and Technology",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Sowutuom, Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [
          {
            "subject": "Elective Mathematics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Pentecost University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://pentvars.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "pentecost-information-technology",
      "name": "Information Technology",
      "universityId": "pentecost",
      "faculty": "Faculty of Engineering and Technology",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Sowutuom, Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Pentecost University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://pentvars.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "pentecost-law",
      "name": "Law",
      "universityId": "pentecost",
      "faculty": "Faculty of Law",
      "degreeType": "LLB",
      "durationYears": 4,
      "campus": "Sowutuom, Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Pentecost University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://pentvars.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "pentecost-nursing",
      "name": "Nursing",
      "universityId": "pentecost",
      "faculty": "Faculty of Health Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Sowutuom, Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Pentecost University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://pentvars.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "pentecost-theology",
      "name": "Theology",
      "universityId": "pentecost",
      "faculty": "Faculty of Theology and Ministry",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Sowutuom, Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Pentecost University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://pentvars.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "regent-accounting",
      "name": "Accounting",
      "universityId": "regent",
      "faculty": "School of Informatics, Engineering and Technology",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "McCarthy Hill, Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [
          {
            "subject": "Financial Accounting",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Regent University College of Science and Technology programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://regent.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "regent-business-administration",
      "name": "Business Administration",
      "universityId": "regent",
      "faculty": "School of Informatics, Engineering and Technology",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "McCarthy Hill, Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Regent University College of Science and Technology programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://regent.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "regent-computer-science",
      "name": "Computer Science",
      "universityId": "regent",
      "faculty": "School of Informatics, Engineering and Technology",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "McCarthy Hill, Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [
          {
            "subject": "Elective Mathematics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Regent University College of Science and Technology programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://regent.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "regent-information-technology",
      "name": "Information Technology",
      "universityId": "regent",
      "faculty": "School of Informatics, Engineering and Technology",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "McCarthy Hill, Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Regent University College of Science and Technology programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://regent.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "regent-theology",
      "name": "Theology",
      "universityId": "regent",
      "faculty": "School of Theology and Ministry",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "McCarthy Hill, Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Regent University College of Science and Technology programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://regent.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "ucc-accounting",
      "name": "Accounting",
      "universityId": "ucc",
      "faculty": "School of Business",
      "degreeType": "BBA",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [
          {
            "subject": "Financial Accounting",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-accounting-distance",
      "name": "Accounting",
      "universityId": "ucc",
      "faculty": "College of Distance Education",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "distance",
      "qualificationLevel": "degree",
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
          "Distance-learning intake, which has its own cut-off.",
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-actuarial-science",
      "name": "Actuarial Science",
      "universityId": "ucc",
      "faculty": "School of Physical Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 16,
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
            "subject": "Elective Mathematics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-african-studies",
      "name": "African Studies",
      "universityId": "ucc",
      "faculty": "Faculty of Arts",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-agri-business",
      "name": "Agri-Business",
      "universityId": "ucc",
      "faculty": "School of Agriculture",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-agricultural-extension-and-community-development",
      "name": "Agricultural Extension and Community Development",
      "universityId": "ucc",
      "faculty": "School of Agriculture",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-agriculture",
      "name": "Agriculture",
      "universityId": "ucc",
      "faculty": "School of Agriculture",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-agro-processing",
      "name": "Agro-Processing",
      "universityId": "ucc",
      "faculty": "School of Agriculture",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-anthropology",
      "name": "Anthropology",
      "universityId": "ucc",
      "faculty": "Faculty of Arts",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-applied-economics",
      "name": "Applied Economics",
      "universityId": "ucc",
      "faculty": "School of Economics",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-arts",
      "name": "Arts",
      "universityId": "ucc",
      "faculty": "Faculty of Arts",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-arts-distance",
      "name": "Arts",
      "universityId": "ucc",
      "faculty": "College of Distance Education",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "distance",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 30,
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
          "Distance-learning intake, which has its own cut-off.",
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-arts-education",
      "name": "Arts Education",
      "universityId": "ucc",
      "faculty": "Faculty of Humanities and Social Sciences Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 16,
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-basic-education",
      "name": "Basic Education",
      "universityId": "ucc",
      "faculty": "Faculty of Educational Foundations",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-basic-education-distance",
      "name": "Basic Education",
      "universityId": "ucc",
      "faculty": "College of Distance Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "distance",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 28,
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
          "Distance-learning intake, which has its own cut-off.",
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-basic-education-distance-2",
      "name": "Basic Education",
      "universityId": "ucc",
      "faculty": "College of Distance Education",
      "degreeType": "Diploma",
      "durationYears": 2,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "distance",
      "qualificationLevel": "diploma",
      "requirements": {
        "minimumAggregate": 32,
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
          "Distance-learning intake, which has its own cut-off.",
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-biochemistry",
      "name": "Biochemistry",
      "universityId": "ucc",
      "faculty": "School of Biological Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 16,
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
            "subject": "Chemistry",
            "minimumGrade": "C6"
          },
          {
            "subject": "Biology",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-biomedical-sciences",
      "name": "Biomedical Sciences",
      "universityId": "ucc",
      "faculty": "School of Biological Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 16,
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
            "subject": "Biology",
            "minimumGrade": "C6"
          },
          {
            "subject": "Chemistry",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-business-administration-distance",
      "name": "Business Administration",
      "universityId": "ucc",
      "faculty": "College of Distance Education",
      "degreeType": "Diploma",
      "durationYears": 2,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "distance",
      "qualificationLevel": "diploma",
      "requirements": {
        "minimumAggregate": 30,
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
          "Distance-learning intake, which has its own cut-off.",
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-chemistry",
      "name": "Chemistry",
      "universityId": "ucc",
      "faculty": "School of Physical Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Chemistry",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-chinese",
      "name": "Chinese",
      "universityId": "ucc",
      "faculty": "Faculty of Arts",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 25,
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-commerce",
      "name": "Commerce",
      "universityId": "ucc",
      "faculty": "School of Business",
      "degreeType": "BBA",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-commerce-distance",
      "name": "Commerce",
      "universityId": "ucc",
      "faculty": "College of Distance Education",
      "degreeType": "BCom",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "distance",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 26,
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
          "Distance-learning intake, which has its own cut-off.",
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-commerce-distance-2",
      "name": "Commerce",
      "universityId": "ucc",
      "faculty": "College of Distance Education",
      "degreeType": "Diploma",
      "durationYears": 2,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "distance",
      "qualificationLevel": "diploma",
      "requirements": {
        "minimumAggregate": 30,
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
          "Distance-learning intake, which has its own cut-off.",
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-communication-design-education",
      "name": "Communication Design Education",
      "universityId": "ucc",
      "faculty": "Faculty of Science and Technology Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-communication-studies",
      "name": "Communication Studies",
      "universityId": "ucc",
      "faculty": "Faculty of Arts",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-community-health-nursing",
      "name": "Community Health Nursing",
      "universityId": "ucc",
      "faculty": "School of Nursing and Midwifery",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Biology",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-computer-science",
      "name": "Computer Science",
      "universityId": "ucc",
      "faculty": "School of Physical Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-computer-science-education",
      "name": "Computer Science Education",
      "universityId": "ucc",
      "faculty": "Faculty of Science and Technology Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [
          {
            "subject": "Elective Mathematics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-conservation-biology-and-entomology",
      "name": "Conservation Biology and Entomology",
      "universityId": "ucc",
      "faculty": "School of Biological Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 25,
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
            "subject": "Biology",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-construction-technology-education",
      "name": "Construction Technology Education",
      "universityId": "ucc",
      "faculty": "Faculty of Science and Technology Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-dance",
      "name": "Dance",
      "universityId": "ucc",
      "faculty": "Faculty of Arts",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-development-economics",
      "name": "Development Economics",
      "universityId": "ucc",
      "faculty": "School of Economics",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-diagnostic-imaging-technology",
      "name": "Diagnostic Imaging Technology",
      "universityId": "ucc",
      "faculty": "School of Allied Health Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 14,
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
            "subject": "Physics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-diagnostic-medical-sonography",
      "name": "Diagnostic Medical Sonography",
      "universityId": "ucc",
      "faculty": "School of Allied Health Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 14,
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
            "subject": "Physics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-dietetics",
      "name": "Dietetics",
      "universityId": "ucc",
      "faculty": "School of Allied Health Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 14,
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
            "subject": "Biology",
            "minimumGrade": "C6"
          },
          {
            "subject": "Chemistry",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-early-childhood-education",
      "name": "Early Childhood Education",
      "universityId": "ucc",
      "faculty": "Faculty of Educational Foundations",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-early-childhood-education-distance",
      "name": "Early Childhood Education",
      "universityId": "ucc",
      "faculty": "College of Distance Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "distance",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 28,
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
          "Distance-learning intake, which has its own cut-off.",
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-early-childhood-education-distance-2",
      "name": "Early Childhood Education",
      "universityId": "ucc",
      "faculty": "College of Distance Education",
      "degreeType": "Diploma",
      "durationYears": 2,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "distance",
      "qualificationLevel": "diploma",
      "requirements": {
        "minimumAggregate": 30,
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
          "Distance-learning intake, which has its own cut-off.",
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-economics",
      "name": "Economics",
      "universityId": "ucc",
      "faculty": "School of Economics",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 16,
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-economics-with-finance",
      "name": "Economics with Finance",
      "universityId": "ucc",
      "faculty": "School of Economics",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-education",
      "name": "Education",
      "universityId": "ucc",
      "faculty": "Faculty of Educational Foundations",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-education-distance",
      "name": "Education",
      "universityId": "ucc",
      "faculty": "College of Distance Education",
      "degreeType": "Diploma",
      "durationYears": 2,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "distance",
      "qualificationLevel": "diploma",
      "requirements": {
        "minimumAggregate": 32,
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
          "Distance-learning intake, which has its own cut-off.",
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-engineering-physics",
      "name": "Engineering Physics",
      "universityId": "ucc",
      "faculty": "School of Physical Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Physics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Elective Mathematics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-english",
      "name": "English",
      "universityId": "ucc",
      "faculty": "Faculty of Arts",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [
          {
            "subject": "Literature in English",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-environmental-science",
      "name": "Environmental Science",
      "universityId": "ucc",
      "faculty": "School of Biological Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-film-studies",
      "name": "Film Studies",
      "universityId": "ucc",
      "faculty": "Faculty of Arts",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 25,
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-finance",
      "name": "Finance",
      "universityId": "ucc",
      "faculty": "School of Business",
      "degreeType": "BCom",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 16,
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-fine-art-education",
      "name": "Fine Art Education",
      "universityId": "ucc",
      "faculty": "Faculty of Science and Technology Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-fisheries-and-aquatic-sciences",
      "name": "Fisheries and Aquatic Sciences",
      "universityId": "ucc",
      "faculty": "School of Biological Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [
          {
            "subject": "Biology",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-forensic-science",
      "name": "Forensic Science",
      "universityId": "ucc",
      "faculty": "School of Biological Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-french",
      "name": "French",
      "universityId": "ucc",
      "faculty": "Faculty of Arts",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [
          {
            "subject": "French",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-geography",
      "name": "Geography",
      "universityId": "ucc",
      "faculty": "Faculty of Arts",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-geography-and-regional-planning",
      "name": "Geography and Regional Planning",
      "universityId": "ucc",
      "faculty": "Faculty of Social Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-health-information-management",
      "name": "Health Information Management",
      "universityId": "ucc",
      "faculty": "School of Allied Health Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-health-physical-education-and-recreation",
      "name": "Health, Physical Education and Recreation",
      "universityId": "ucc",
      "faculty": "Faculty of Science and Technology Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 23,
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-health-sciences-education",
      "name": "Health Sciences Education",
      "universityId": "ucc",
      "faculty": "Faculty of Science and Technology Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-history",
      "name": "History",
      "universityId": "ucc",
      "faculty": "Faculty of Arts",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [
          {
            "subject": "History",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-home-economics-education",
      "name": "Home Economics Education",
      "universityId": "ucc",
      "faculty": "Faculty of Science and Technology Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-horticulture",
      "name": "Horticulture",
      "universityId": "ucc",
      "faculty": "School of Agriculture",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-hospitality-management",
      "name": "Hospitality Management",
      "universityId": "ucc",
      "faculty": "School of Business",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-human-resource-management",
      "name": "Human Resource Management",
      "universityId": "ucc",
      "faculty": "School of Business",
      "degreeType": "BBA",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-industrial-chemistry",
      "name": "Industrial Chemistry",
      "universityId": "ucc",
      "faculty": "School of Physical Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [
          {
            "subject": "Chemistry",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-information-technology",
      "name": "Information Technology",
      "universityId": "ucc",
      "faculty": "School of Physical Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-information-technology-distance",
      "name": "Information Technology",
      "universityId": "ucc",
      "faculty": "College of Distance Education",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "distance",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 32,
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
          "Distance-learning intake, which has its own cut-off.",
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-information-technology-distance-2",
      "name": "Information Technology",
      "universityId": "ucc",
      "faculty": "College of Distance Education",
      "degreeType": "Diploma",
      "durationYears": 2,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "distance",
      "qualificationLevel": "diploma",
      "requirements": {
        "minimumAggregate": 30,
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
          "Distance-learning intake, which has its own cut-off.",
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-information-technology-education",
      "name": "Information Technology Education",
      "universityId": "ucc",
      "faculty": "Faculty of Science and Technology Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-junior-high-school-education",
      "name": "Junior High School Education",
      "universityId": "ucc",
      "faculty": "Faculty of Educational Foundations",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-junior-high-school-education-distance",
      "name": "Junior High School Education",
      "universityId": "ucc",
      "faculty": "College of Distance Education",
      "degreeType": "Diploma",
      "durationYears": 2,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "distance",
      "qualificationLevel": "diploma",
      "requirements": {
        "minimumAggregate": 30,
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
          "Distance-learning intake, which has its own cut-off.",
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-laboratory-technology",
      "name": "Laboratory Technology",
      "universityId": "ucc",
      "faculty": "School of Physical Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-labour-policy-studies-distance",
      "name": "Labour Policy Studies",
      "universityId": "ucc",
      "faculty": "College of Distance Education",
      "degreeType": "Diploma",
      "durationYears": 2,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "distance",
      "qualificationLevel": "diploma",
      "requirements": {
        "minimumAggregate": 30,
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
          "Distance-learning intake, which has its own cut-off.",
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-law",
      "name": "Law",
      "universityId": "ucc",
      "faculty": "Faculty of Law",
      "degreeType": "LLB",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-linguistics",
      "name": "Linguistics",
      "universityId": "ucc",
      "faculty": "Faculty of Arts",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-management",
      "name": "Management",
      "universityId": "ucc",
      "faculty": "School of Business",
      "degreeType": "BBA",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-management-studies-distance",
      "name": "Management Studies",
      "universityId": "ucc",
      "faculty": "College of Distance Education",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "distance",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 26,
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
          "Distance-learning intake, which has its own cut-off.",
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-marketing",
      "name": "Marketing",
      "universityId": "ucc",
      "faculty": "School of Business",
      "degreeType": "BCom",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-mathematics",
      "name": "Mathematics",
      "universityId": "ucc",
      "faculty": "School of Physical Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [
          {
            "subject": "Elective Mathematics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-mathematics-and-statistics",
      "name": "Mathematics and Statistics",
      "universityId": "ucc",
      "faculty": "School of Physical Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-mathematics-education",
      "name": "Mathematics Education",
      "universityId": "ucc",
      "faculty": "Faculty of Science and Technology Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Elective Mathematics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-mathematics-education-distance",
      "name": "Mathematics Education",
      "universityId": "ucc",
      "faculty": "College of Distance Education",
      "degreeType": "Diploma",
      "durationYears": 2,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "distance",
      "qualificationLevel": "diploma",
      "requirements": {
        "minimumAggregate": 36,
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
          "Distance-learning intake, which has its own cut-off.",
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-mathematics-with-business",
      "name": "Mathematics with Business",
      "universityId": "ucc",
      "faculty": "School of Physical Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-mathematics-with-economics",
      "name": "Mathematics with Economics",
      "universityId": "ucc",
      "faculty": "School of Physical Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-medical-laboratory-science",
      "name": "Medical Laboratory Science",
      "universityId": "ucc",
      "faculty": "School of Allied Health Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-medicine",
      "name": "Medicine",
      "universityId": "ucc",
      "faculty": "School of Medical Sciences",
      "degreeType": "MBChB",
      "durationYears": 6,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
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
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-meteorology-and-atmospheric-physics",
      "name": "Meteorology and Atmospheric Physics",
      "universityId": "ucc",
      "faculty": "School of Physical Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Physics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-midwifery",
      "name": "Midwifery",
      "universityId": "ucc",
      "faculty": "School of Nursing and Midwifery",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-molecular-biology-and-biotechnology",
      "name": "Molecular Biology and Biotechnology",
      "universityId": "ucc",
      "faculty": "School of Biological Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [
          {
            "subject": "Biology",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-music",
      "name": "Music",
      "universityId": "ucc",
      "faculty": "Faculty of Arts",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-nursing",
      "name": "Nursing",
      "universityId": "ucc",
      "faculty": "School of Nursing and Midwifery",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-nutrition",
      "name": "Nutrition",
      "universityId": "ucc",
      "faculty": "School of Allied Health Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-optometry",
      "name": "Optometry",
      "universityId": "ucc",
      "faculty": "School of Allied Health Sciences",
      "degreeType": "OD",
      "durationYears": 6,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [
          {
            "subject": "Physics",
            "minimumGrade": "C6"
          },
          {
            "subject": "Biology",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-pharmacy",
      "name": "Pharmacy",
      "universityId": "ucc",
      "faculty": "School of Pharmacy",
      "degreeType": "PharmD",
      "durationYears": 6,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-physician-assistant-studies",
      "name": "Physician Assistant Studies",
      "universityId": "ucc",
      "faculty": "School of Allied Health Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-physics",
      "name": "Physics",
      "universityId": "ucc",
      "faculty": "School of Physical Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [
          {
            "subject": "Physics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-physiotherapy",
      "name": "Physiotherapy",
      "universityId": "ucc",
      "faculty": "School of Allied Health Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-political-science",
      "name": "Political Science",
      "universityId": "ucc",
      "faculty": "Faculty of Social Sciences",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-population-and-health",
      "name": "Population and Health",
      "universityId": "ucc",
      "faculty": "Faculty of Social Sciences",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-primary-education",
      "name": "Primary Education",
      "universityId": "ucc",
      "faculty": "Faculty of Educational Foundations",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-procurement-and-supply-chain-management",
      "name": "Procurement and Supply Chain Management",
      "universityId": "ucc",
      "faculty": "School of Business",
      "degreeType": "BCom",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-psychology",
      "name": "Psychology",
      "universityId": "ucc",
      "faculty": "Faculty of Social Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-psychology-distance",
      "name": "Psychology",
      "universityId": "ucc",
      "faculty": "College of Distance Education",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "distance",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 32,
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
          "Distance-learning intake, which has its own cut-off.",
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-religious-studies",
      "name": "Religious Studies",
      "universityId": "ucc",
      "faculty": "Faculty of Arts",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-science-education",
      "name": "Science Education",
      "universityId": "ucc",
      "faculty": "Faculty of Science and Technology Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-social-behaviour-and-conflict-management",
      "name": "Social Behaviour and Conflict Management",
      "universityId": "ucc",
      "faculty": "Faculty of Social Sciences",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-social-sciences",
      "name": "Social Sciences",
      "universityId": "ucc",
      "faculty": "Faculty of Social Sciences",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-sociology",
      "name": "Sociology",
      "universityId": "ucc",
      "faculty": "Faculty of Social Sciences",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-sport-and-exercise-science",
      "name": "Sport and Exercise Science",
      "universityId": "ucc",
      "faculty": "School of Allied Health Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-statistics",
      "name": "Statistics",
      "universityId": "ucc",
      "faculty": "School of Physical Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 25,
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
            "subject": "Elective Mathematics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-theatre-studies",
      "name": "Theatre Studies",
      "universityId": "ucc",
      "faculty": "Faculty of Arts",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 23,
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-tourism-management",
      "name": "Tourism Management",
      "universityId": "ucc",
      "faculty": "School of Business",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "ucc-water-and-sanitation",
      "name": "Water and Sanitation",
      "universityId": "ucc",
      "faculty": "School of Biological Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Cape Coast",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "University of Cape Coast cut-off points, 2026 admissions listing",
        "sourceUrl": "https://ghanaunichecker.com/ucc-cut-off-points-2026",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      }
    },
    {
      "id": "uds-accounting",
      "name": "Accounting",
      "universityId": "uds",
      "faculty": "School of Business",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [
          {
            "subject": "Financial Accounting",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-agribusiness",
      "name": "Agribusiness",
      "universityId": "uds",
      "faculty": "Faculty of Agriculture, Food and Consumer Sciences",
      "degreeType": "Diploma",
      "durationYears": 2,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "diploma",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-agricultural-science-education",
      "name": "Agricultural Science Education",
      "universityId": "uds",
      "faculty": "Faculty of Agriculture, Food and Consumer Sciences",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-agriculture-technology",
      "name": "Agriculture Technology",
      "universityId": "uds",
      "faculty": "Faculty of Agriculture, Food and Consumer Sciences",
      "degreeType": "Diploma",
      "durationYears": 2,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "diploma",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-agriculture-technology-agricultural-economics-and-extension",
      "name": "Agriculture Technology (Agricultural Economics and Extension)",
      "universityId": "uds",
      "faculty": "Faculty of Agriculture, Food and Consumer Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-agriculture-technology-agronomy",
      "name": "Agriculture Technology (Agronomy)",
      "universityId": "uds",
      "faculty": "Faculty of Agriculture, Food and Consumer Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-agriculture-technology-animal-science",
      "name": "Agriculture Technology (Animal Science)",
      "universityId": "uds",
      "faculty": "Faculty of Agriculture, Food and Consumer Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-agriculture-technology-biotechnology",
      "name": "Agriculture Technology (Biotechnology)",
      "universityId": "uds",
      "faculty": "Faculty of Agriculture, Food and Consumer Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-agriculture-technology-horticulture",
      "name": "Agriculture Technology (Horticulture)",
      "universityId": "uds",
      "faculty": "Faculty of Agriculture, Food and Consumer Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-agriculture-technology-mechanization-and-irrigation",
      "name": "Agriculture Technology (Mechanization and Irrigation)",
      "universityId": "uds",
      "faculty": "Faculty of Agriculture, Food and Consumer Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-agriculture-technology-soil-science",
      "name": "Agriculture Technology (Soil Science)",
      "universityId": "uds",
      "faculty": "Faculty of Agriculture, Food and Consumer Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-aquaculture-and-fisheries-science",
      "name": "Aquaculture and Fisheries Science",
      "universityId": "uds",
      "faculty": "Faculty of Bioscience",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-arabic-education",
      "name": "Arabic Education",
      "universityId": "uds",
      "faculty": "Faculty of Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-banking-and-finance",
      "name": "Banking and Finance",
      "universityId": "uds",
      "faculty": "School of Business",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-basic-education",
      "name": "Basic Education",
      "universityId": "uds",
      "faculty": "Faculty of Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-biotechnology-and-molecular-biology",
      "name": "Biotechnology and Molecular Biology",
      "universityId": "uds",
      "faculty": "Faculty of Bioscience",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-business-administration",
      "name": "Business Administration",
      "universityId": "uds",
      "faculty": "School of Business",
      "degreeType": "Diploma",
      "durationYears": 2,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "diploma",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-business-information-systems",
      "name": "Business Information Systems",
      "universityId": "uds",
      "faculty": "School of Business",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-business-studies-education",
      "name": "Business Studies Education",
      "universityId": "uds",
      "faculty": "Faculty of Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-chemical-science-and-technology",
      "name": "Chemical Science and Technology",
      "universityId": "uds",
      "faculty": "Faculty of Physical Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [
          {
            "subject": "Chemistry",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-community-nutrition",
      "name": "Community Nutrition",
      "universityId": "uds",
      "faculty": "School of Allied Health Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-computing-mathematics",
      "name": "Computing Mathematics",
      "universityId": "uds",
      "faculty": "Faculty of Physical Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-development-education-studies",
      "name": "Development Education Studies",
      "universityId": "uds",
      "faculty": "Faculty of Sustainable Development Studies",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-early-childhood-care-and-education",
      "name": "Early Childhood Care and Education",
      "universityId": "uds",
      "faculty": "Faculty of Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-ecotourism-and-hospitality-management",
      "name": "Ecotourism and Hospitality Management",
      "universityId": "uds",
      "faculty": "Faculty of Natural Resources and Environment",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-engineering-physics",
      "name": "Engineering Physics",
      "universityId": "uds",
      "faculty": "Faculty of Physical Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-environmental-management-and-sustainability",
      "name": "Environmental Management and Sustainability",
      "universityId": "uds",
      "faculty": "Faculty of Natural Resources and Environment",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-family-and-consumer-science",
      "name": "Family and Consumer Science",
      "universityId": "uds",
      "faculty": "Faculty of Agriculture, Food and Consumer Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-family-and-consumer-science-education",
      "name": "Family and Consumer Science Education",
      "universityId": "uds",
      "faculty": "Faculty of Agriculture, Food and Consumer Sciences",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-finance-and-economics",
      "name": "Finance and Economics",
      "universityId": "uds",
      "faculty": "School of Business",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-food-systems",
      "name": "Food Systems",
      "universityId": "uds",
      "faculty": "Faculty of Agriculture, Food and Consumer Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-forensic-science",
      "name": "Forensic Science",
      "universityId": "uds",
      "faculty": "Faculty of Bioscience",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-forest-resource-conservation-and-management",
      "name": "Forest Resource Conservation and Management",
      "universityId": "uds",
      "faculty": "Faculty of Natural Resources and Environment",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-health-information-management",
      "name": "Health Information Management",
      "universityId": "uds",
      "faculty": "School of Public Health",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-human-resource-management",
      "name": "Human Resource Management",
      "universityId": "uds",
      "faculty": "School of Business",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-marketing",
      "name": "Marketing",
      "universityId": "uds",
      "faculty": "School of Business",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-medical-imaging-technology",
      "name": "Medical Imaging Technology",
      "universityId": "uds",
      "faculty": "School of Allied Health Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [
          {
            "subject": "Physics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-medicine",
      "name": "Medicine",
      "universityId": "uds",
      "faculty": "School of Medicine",
      "degreeType": "MBChB",
      "durationYears": 6,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Biology",
            "minimumGrade": "C6"
          },
          {
            "subject": "Chemistry",
            "minimumGrade": "C6"
          },
          {
            "subject": "Physics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-microbiology",
      "name": "Microbiology",
      "universityId": "uds",
      "faculty": "Faculty of Bioscience",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-nurse-practitioner",
      "name": "Nurse Practitioner",
      "universityId": "uds",
      "faculty": "School of Nursing and Midwifery",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-paediatric-nursing",
      "name": "Paediatric Nursing",
      "universityId": "uds",
      "faculty": "School of Nursing and Midwifery",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-procurement-and-supply-chain-management",
      "name": "Procurement and Supply Chain Management",
      "universityId": "uds",
      "faculty": "School of Business",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-public-administration",
      "name": "Public Administration",
      "universityId": "uds",
      "faculty": "School of Business",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-renewable-natural-resources",
      "name": "Renewable Natural Resources",
      "universityId": "uds",
      "faculty": "Faculty of Natural Resources and Environment",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-social-change-communication",
      "name": "Social Change Communication",
      "universityId": "uds",
      "faculty": "Faculty of Communication and Media Studies",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uds-social-science-education",
      "name": "Social Science Education",
      "universityId": "uds",
      "faculty": "Faculty of Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Tamale",
      "region": "Northern",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UDS programme catalogue. UDS does not publish a per-programme cut-off list, so these show the general minimum aggregate for degree admission rather than a programme-specific figure.",
        "sourceUrl": "https://uds.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uew-accounting-education",
      "name": "Accounting Education",
      "universityId": "uew",
      "faculty": "Faculty of Business Education",
      "degreeType": "B.Sc",
      "durationYears": 4,
      "campus": "Winneba",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [
          {
            "subject": "Financial Accounting",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Published separately by gender: 15 for male applicants, 16 for female applicants. The stricter figure is shown.",
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "UEW admission cut-off points, as reported by O3Schools (secondary source). UEW states these are guidance only and not fixed.",
        "sourceUrl": "https://o3schools.com/uew-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      },
      "cutoffByGender": {
        "male": 15,
        "female": 16
      }
    },
    {
      "id": "uew-arabic-education",
      "name": "Arabic Education",
      "universityId": "uew",
      "faculty": "Faculty of Foreign Languages Education",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Winneba",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 36,
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "UEW admission cut-off points, as reported by O3Schools (secondary source). UEW states these are guidance only and not fixed.",
        "sourceUrl": "https://o3schools.com/uew-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      },
      "cutoffByGender": {
        "male": 36,
        "female": 36
      }
    },
    {
      "id": "uew-art-education",
      "name": "Art Education",
      "universityId": "uew",
      "faculty": "Faculty of Creative Arts",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Winneba",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 36,
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "UEW admission cut-off points, as reported by O3Schools (secondary source). UEW states these are guidance only and not fixed.",
        "sourceUrl": "https://o3schools.com/uew-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      },
      "cutoffByGender": {
        "male": 36,
        "female": 36
      }
    },
    {
      "id": "uew-automotive-technology-education",
      "name": "Automotive Technology Education",
      "universityId": "uew",
      "faculty": "Faculty of Technical Education",
      "degreeType": "B.Sc",
      "durationYears": 4,
      "campus": "Winneba",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 36,
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "UEW admission cut-off points, as reported by O3Schools (secondary source). UEW states these are guidance only and not fixed.",
        "sourceUrl": "https://o3schools.com/uew-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      },
      "cutoffByGender": {
        "male": 36,
        "female": 36
      }
    },
    {
      "id": "uew-basic-education",
      "name": "Basic Education",
      "universityId": "uew",
      "faculty": "Faculty of Educational Studies",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Winneba",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 36,
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "UEW admission cut-off points, as reported by O3Schools (secondary source). UEW states these are guidance only and not fixed.",
        "sourceUrl": "https://o3schools.com/uew-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      },
      "cutoffByGender": {
        "male": 36,
        "female": 36
      }
    },
    {
      "id": "uew-english-education",
      "name": "English Education",
      "universityId": "uew",
      "faculty": "Faculty of Languages Education",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Winneba",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 36,
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
            "subject": "Literature in English",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "UEW admission cut-off points, as reported by O3Schools (secondary source). UEW states these are guidance only and not fixed.",
        "sourceUrl": "https://o3schools.com/uew-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      },
      "cutoffByGender": {
        "male": 36,
        "female": 36
      }
    },
    {
      "id": "uew-ewe-education",
      "name": "Ewe Education",
      "universityId": "uew",
      "faculty": "Faculty of Ghanaian Languages Education",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Winneba",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 36,
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "UEW admission cut-off points, as reported by O3Schools (secondary source). UEW states these are guidance only and not fixed.",
        "sourceUrl": "https://o3schools.com/uew-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      },
      "cutoffByGender": {
        "male": 36,
        "female": 36
      }
    },
    {
      "id": "uew-french-education",
      "name": "French Education",
      "universityId": "uew",
      "faculty": "Faculty of Foreign Languages Education",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Winneba",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 36,
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
            "subject": "French",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "UEW admission cut-off points, as reported by O3Schools (secondary source). UEW states these are guidance only and not fixed.",
        "sourceUrl": "https://o3schools.com/uew-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      },
      "cutoffByGender": {
        "male": 36,
        "female": 36
      }
    },
    {
      "id": "uew-ga-and-dangme-education",
      "name": "Ga and Dangme Education",
      "universityId": "uew",
      "faculty": "Faculty of Ghanaian Languages Education",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Winneba",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 36,
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "UEW admission cut-off points, as reported by O3Schools (secondary source). UEW states these are guidance only and not fixed.",
        "sourceUrl": "https://o3schools.com/uew-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      },
      "cutoffByGender": {
        "male": 36,
        "female": 36
      }
    },
    {
      "id": "uew-ghanaian-languages-education-dagaare-dagbani-gonja-gurune-kasem-kusaal",
      "name": "Ghanaian Languages Education (Dagaare, Dagbani, Gonja, Gurune, Kasem, Kusaal)",
      "universityId": "uew",
      "faculty": "Faculty of Ghanaian Languages Education",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Winneba",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 36,
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "UEW admission cut-off points, as reported by O3Schools (secondary source). UEW states these are guidance only and not fixed.",
        "sourceUrl": "https://o3schools.com/uew-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      },
      "cutoffByGender": {
        "male": 36,
        "female": 36
      }
    },
    {
      "id": "uew-ghanaian-languages-education-fante-nzema-twi",
      "name": "Ghanaian Languages Education (Fante, Nzema, Twi)",
      "universityId": "uew",
      "faculty": "Faculty of Ghanaian Languages Education",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Winneba",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 36,
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "UEW admission cut-off points, as reported by O3Schools (secondary source). UEW states these are guidance only and not fixed.",
        "sourceUrl": "https://o3schools.com/uew-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      },
      "cutoffByGender": {
        "male": 36,
        "female": 36
      }
    },
    {
      "id": "uew-graphic-design",
      "name": "Graphic Design",
      "universityId": "uew",
      "faculty": "Faculty of Creative Arts",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Winneba",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 36,
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "UEW admission cut-off points, as reported by O3Schools (secondary source). UEW states these are guidance only and not fixed.",
        "sourceUrl": "https://o3schools.com/uew-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      },
      "cutoffByGender": {
        "male": 36,
        "female": 36
      }
    },
    {
      "id": "uew-health-administration-and-education",
      "name": "Health Administration and Education",
      "universityId": "uew",
      "faculty": "Faculty of Science Education",
      "degreeType": "B.Sc",
      "durationYears": 4,
      "campus": "Winneba",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "UEW admission cut-off points, as reported by O3Schools (secondary source). UEW states these are guidance only and not fixed.",
        "sourceUrl": "https://o3schools.com/uew-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      },
      "cutoffByGender": {
        "male": 24,
        "female": 24
      }
    },
    {
      "id": "uew-information-and-communication-technology-education",
      "name": "Information and Communication Technology Education",
      "universityId": "uew",
      "faculty": "Faculty of Science Education",
      "degreeType": "B.Sc",
      "durationYears": 4,
      "campus": "Winneba",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 36,
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "UEW admission cut-off points, as reported by O3Schools (secondary source). UEW states these are guidance only and not fixed.",
        "sourceUrl": "https://o3schools.com/uew-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      },
      "cutoffByGender": {
        "male": 36,
        "female": 36
      }
    },
    {
      "id": "uew-management-education",
      "name": "Management Education",
      "universityId": "uew",
      "faculty": "Faculty of Business Education",
      "degreeType": "B.Sc",
      "durationYears": 4,
      "campus": "Winneba",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 36,
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "UEW admission cut-off points, as reported by O3Schools (secondary source). UEW states these are guidance only and not fixed.",
        "sourceUrl": "https://o3schools.com/uew-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      },
      "cutoffByGender": {
        "male": 36,
        "female": 36
      }
    },
    {
      "id": "uew-political-science-education",
      "name": "Political Science Education",
      "universityId": "uew",
      "faculty": "Faculty of Social Sciences Education",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Winneba",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "Published separately by gender: 17 for male applicants, 18 for female applicants. The stricter figure is shown.",
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "UEW admission cut-off points, as reported by O3Schools (secondary source). UEW states these are guidance only and not fixed.",
        "sourceUrl": "https://o3schools.com/uew-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      },
      "cutoffByGender": {
        "male": 17,
        "female": 18
      }
    },
    {
      "id": "uew-secretarial-education",
      "name": "Secretarial Education",
      "universityId": "uew",
      "faculty": "Faculty of Business Education",
      "degreeType": "B.Sc",
      "durationYears": 4,
      "campus": "Winneba",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 36,
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "UEW admission cut-off points, as reported by O3Schools (secondary source). UEW states these are guidance only and not fixed.",
        "sourceUrl": "https://o3schools.com/uew-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      },
      "cutoffByGender": {
        "male": 36,
        "female": 36
      }
    },
    {
      "id": "uew-social-studies-education",
      "name": "Social Studies Education",
      "universityId": "uew",
      "faculty": "Faculty of Social Sciences Education",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Winneba",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "UEW admission cut-off points, as reported by O3Schools (secondary source). UEW states these are guidance only and not fixed.",
        "sourceUrl": "https://o3schools.com/uew-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      },
      "cutoffByGender": {
        "male": 22,
        "female": 22
      }
    },
    {
      "id": "uew-theatre-arts",
      "name": "Theatre Arts",
      "universityId": "uew",
      "faculty": "Faculty of Creative Arts",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Winneba",
      "region": "Central",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 36,
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
          "Reported by a secondary source. Confirm on the university portal before applying."
        ]
      },
      "provenance": {
        "source": "UEW admission cut-off points, as reported by O3Schools (secondary source). UEW states these are guidance only and not fixed.",
        "sourceUrl": "https://o3schools.com/uew-cut-off-points/",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "researched"
      },
      "cutoffByGender": {
        "male": 36,
        "female": 36
      }
    },
    {
      "id": "ug-actuarial-science",
      "name": "Actuarial Science",
      "universityId": "ug",
      "faculty": "College of Basic and Applied Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-actuarial-science-fee-paying",
      "name": "Actuarial Science",
      "universityId": "ug",
      "faculty": "College of Basic and Applied Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "fee-paying",
      "qualificationLevel": "degree",
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
            "subject": "Elective Mathematics",
            "minimumGrade": "B3"
          }
        ],
        "notes": [
          "Full-fee-paying admission. The regular-track cut-off is lower."
        ]
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
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
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-administration-city",
      "name": "Administration",
      "universityId": "ug",
      "faculty": "Accra City Campus",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra City Campus",
      "region": "Greater Accra",
      "admissionTrack": "city-campus",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-administration-distance",
      "name": "Administration",
      "universityId": "ug",
      "faculty": "School of Continuing and Distance Education",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "distance",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 30,
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
          "Distance-learning intake, which has its own cut-off."
        ]
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-administration-fee-paying",
      "name": "Administration",
      "universityId": "ug",
      "faculty": "Business School",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "fee-paying",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": [
          "Full-fee-paying admission. The regular-track cut-off is lower."
        ]
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-administration-kumasi-and-takoradi-city-campuses-city",
      "name": "Administration (Kumasi and Takoradi City Campuses)",
      "universityId": "ug",
      "faculty": "College of Education",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Kumasi / Takoradi",
      "region": "Greater Accra",
      "admissionTrack": "city-campus",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-agricultural-engineering",
      "name": "Agricultural Engineering",
      "universityId": "ug",
      "faculty": "College of Basic and Applied Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Elective Mathematics",
            "minimumGrade": "B3"
          }
        ],
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-agricultural-engineering-fee-paying",
      "name": "Agricultural Engineering",
      "universityId": "ug",
      "faculty": "College of Basic and Applied Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "fee-paying",
      "qualificationLevel": "degree",
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
            "subject": "Elective Mathematics",
            "minimumGrade": "B3"
          }
        ],
        "notes": [
          "Full-fee-paying admission. The regular-track cut-off is lower."
        ]
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-agriculture-science",
      "name": "Agriculture Science",
      "universityId": "ug",
      "faculty": "College of Basic and Applied Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-arabic-education",
      "name": "Arabic Education",
      "universityId": "ug",
      "faculty": "College of Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-arts-bouquets-with-business-subject",
      "name": "Arts (Bouquets with Business subject)",
      "universityId": "ug",
      "faculty": "College of Humanities",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-arts-bouquets-with-business-subject-fee-paying",
      "name": "Arts (Bouquets with Business subject)",
      "universityId": "ug",
      "faculty": "College of Humanities",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "fee-paying",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": [
          "Full-fee-paying admission. The regular-track cut-off is lower."
        ]
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-arts-business-science-or-vocational-background",
      "name": "Arts (Business, Science or Vocational background)",
      "universityId": "ug",
      "faculty": "College of Humanities",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 14,
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
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-arts-city",
      "name": "Arts",
      "universityId": "ug",
      "faculty": "Accra City Campus",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Accra City Campus",
      "region": "Greater Accra",
      "admissionTrack": "city-campus",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-arts-distance",
      "name": "Arts",
      "universityId": "ug",
      "faculty": "School of Continuing and Distance Education",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "distance",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 30,
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
          "Distance-learning intake, which has its own cut-off."
        ]
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-arts-general-arts-background",
      "name": "Arts (General Arts background)",
      "universityId": "ug",
      "faculty": "College of Humanities",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 16,
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
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-arts-general-arts-background-fee-paying",
      "name": "Arts (General Arts background)",
      "universityId": "ug",
      "faculty": "College of Humanities",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "fee-paying",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": [
          "Full-fee-paying admission. The regular-track cut-off is lower."
        ]
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-biological-sciences",
      "name": "Biological Sciences",
      "universityId": "ug",
      "faculty": "College of Basic and Applied Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 14,
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
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-biological-sciences-fee-paying",
      "name": "Biological Sciences",
      "universityId": "ug",
      "faculty": "College of Basic and Applied Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "fee-paying",
      "qualificationLevel": "degree",
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
          "Full-fee-paying admission. The regular-track cut-off is lower."
        ]
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
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
      "faculty": "College of Basic and Applied Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-biomedical-engineering-fee-paying",
      "name": "Biomedical Engineering",
      "universityId": "ug",
      "faculty": "College of Basic and Applied Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "fee-paying",
      "qualificationLevel": "degree",
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
            "subject": "Elective Mathematics",
            "minimumGrade": "B3"
          }
        ],
        "notes": [
          "Full-fee-paying admission. The regular-track cut-off is lower."
        ]
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-computer-engineering",
      "name": "Computer Engineering",
      "universityId": "ug",
      "faculty": "College of Basic and Applied Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-computer-engineering-fee-paying",
      "name": "Computer Engineering",
      "universityId": "ug",
      "faculty": "College of Basic and Applied Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "fee-paying",
      "qualificationLevel": "degree",
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
            "subject": "Elective Mathematics",
            "minimumGrade": "B3"
          }
        ],
        "notes": [
          "Full-fee-paying admission. The regular-track cut-off is lower."
        ]
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
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
      "faculty": "College of Basic and Applied Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-computer-science-education",
      "name": "Computer Science Education",
      "universityId": "ug",
      "faculty": "College of Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 9,
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
        "electiveSubjects": [
          {
            "subject": "Elective Mathematics",
            "minimumGrade": "C4"
          }
        ],
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-computer-science-education-fee-paying",
      "name": "Computer Science Education",
      "universityId": "ug",
      "faculty": "College of Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "fee-paying",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 12,
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
        "electiveSubjects": [
          {
            "subject": "Elective Mathematics",
            "minimumGrade": "C4"
          }
        ],
        "notes": [
          "Full-fee-paying admission. The regular-track cut-off is lower."
        ]
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-computer-science-fee-paying",
      "name": "Computer Science",
      "universityId": "ug",
      "faculty": "College of Basic and Applied Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "fee-paying",
      "qualificationLevel": "degree",
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
            "subject": "Elective Mathematics",
            "minimumGrade": "B3"
          }
        ],
        "notes": [
          "Full-fee-paying admission. The regular-track cut-off is lower."
        ]
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-consumer-sciences-education",
      "name": "Consumer Sciences Education",
      "universityId": "ug",
      "faculty": "College of Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          },
          {
            "subject": "Management in Living",
            "minimumGrade": "C6"
          }
        ],
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-consumer-sciences-education-fee-paying",
      "name": "Consumer Sciences Education",
      "universityId": "ug",
      "faculty": "College of Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "fee-paying",
      "qualificationLevel": "degree",
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
            "subject": "Biology",
            "minimumGrade": "C6"
          },
          {
            "subject": "Chemistry",
            "minimumGrade": "C6"
          },
          {
            "subject": "Management in Living",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Full-fee-paying admission. The regular-track cut-off is lower."
        ]
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-dental-surgery",
      "name": "Dental Surgery",
      "universityId": "ug",
      "faculty": "College of Health Sciences",
      "degreeType": "BDS",
      "durationYears": 6,
      "campus": "Accra (Korle Bu)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-diagnostic-radiography",
      "name": "Diagnostic Radiography",
      "universityId": "ug",
      "faculty": "College of Health Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Korle Bu)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 13,
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
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-dietetics",
      "name": "Dietetics",
      "universityId": "ug",
      "faculty": "College of Health Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 14,
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
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-earth-science",
      "name": "Earth Science",
      "universityId": "ug",
      "faculty": "College of Basic and Applied Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Chemistry",
            "minimumGrade": "C6"
          }
        ],
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-earth-science-fee-paying",
      "name": "Earth Science",
      "universityId": "ug",
      "faculty": "College of Basic and Applied Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "fee-paying",
      "qualificationLevel": "degree",
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
            "subject": "Chemistry",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Full-fee-paying admission. The regular-track cut-off is lower."
        ]
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-education-early-grade-specialism",
      "name": "Education (Early Grade Specialism)",
      "universityId": "ug",
      "faculty": "College of Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-education-early-grade-specialism-distance",
      "name": "Education (Early Grade Specialism)",
      "universityId": "ug",
      "faculty": "School of Continuing and Distance Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "distance",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 30,
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
          "Distance-learning intake, which has its own cut-off."
        ]
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-education-jhs-specialism",
      "name": "Education (JHS Specialism)",
      "universityId": "ug",
      "faculty": "College of Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-education-jhs-specialism-distance",
      "name": "Education (JHS Specialism)",
      "universityId": "ug",
      "faculty": "School of Continuing and Distance Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "distance",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 30,
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
          "Distance-learning intake, which has its own cut-off."
        ]
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-education-upper-grade-specialism",
      "name": "Education (Upper Grade Specialism)",
      "universityId": "ug",
      "faculty": "College of Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-education-upper-grade-specialism-distance",
      "name": "Education (Upper Grade Specialism)",
      "universityId": "ug",
      "faculty": "School of Continuing and Distance Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "distance",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 30,
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
          "Distance-learning intake, which has its own cut-off."
        ]
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-english-education",
      "name": "English Education",
      "universityId": "ug",
      "faculty": "College of Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [
          {
            "subject": "Literature in English",
            "minimumGrade": "C6"
          }
        ],
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-family-and-consumer-sciences-family-and-child-studies",
      "name": "Family and Consumer Sciences (Family and Child Studies)",
      "universityId": "ug",
      "faculty": "College of Basic and Applied Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 16,
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
            "subject": "Management in Living",
            "minimumGrade": "C6"
          }
        ],
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-family-and-consumer-sciences-family-and-child-studies-fee-paying",
      "name": "Family and Consumer Sciences (Family and Child Studies)",
      "universityId": "ug",
      "faculty": "College of Basic and Applied Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "fee-paying",
      "qualificationLevel": "degree",
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
            "subject": "Management in Living",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Full-fee-paying admission. The regular-track cut-off is lower."
        ]
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-family-and-consumer-sciences-food-and-clothing",
      "name": "Family and Consumer Sciences (Food and Clothing)",
      "universityId": "ug",
      "faculty": "College of Basic and Applied Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Chemistry",
            "minimumGrade": "C6"
          }
        ],
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-fine-arts",
      "name": "Fine Arts",
      "universityId": "ug",
      "faculty": "School of Performing Arts",
      "degreeType": "BFA",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": [
          "Audition or interview required."
        ]
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-fine-arts-fee-paying",
      "name": "Fine Arts",
      "universityId": "ug",
      "faculty": "School of Performing Arts",
      "degreeType": "BFA",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "fee-paying",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "Audition or interview required.",
          "Full-fee-paying admission. The regular-track cut-off is lower."
        ]
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-food-process-engineering",
      "name": "Food Process Engineering",
      "universityId": "ug",
      "faculty": "College of Basic and Applied Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Elective Mathematics",
            "minimumGrade": "B3"
          }
        ],
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-food-process-engineering-fee-paying",
      "name": "Food Process Engineering",
      "universityId": "ug",
      "faculty": "College of Basic and Applied Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "fee-paying",
      "qualificationLevel": "degree",
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
            "subject": "Elective Mathematics",
            "minimumGrade": "B3"
          }
        ],
        "notes": [
          "Full-fee-paying admission. The regular-track cut-off is lower."
        ]
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-french-education",
      "name": "French Education",
      "universityId": "ug",
      "faculty": "College of Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [
          {
            "subject": "French",
            "minimumGrade": "C6"
          }
        ],
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-information-and-communication-technology-education",
      "name": "Information and Communication Technology Education",
      "universityId": "ug",
      "faculty": "College of Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 12,
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
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-information-and-communication-technology-education-fee-paying",
      "name": "Information and Communication Technology Education",
      "universityId": "ug",
      "faculty": "College of Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "fee-paying",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 15,
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
          "Full-fee-paying admission. The regular-track cut-off is lower."
        ]
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
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
      "faculty": "College of Basic and Applied Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-information-technology-distance",
      "name": "Information Technology",
      "universityId": "ug",
      "faculty": "School of Continuing and Distance Education",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "distance",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "Distance-learning intake, which has its own cut-off."
        ]
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-information-technology-fee-paying",
      "name": "Information Technology",
      "universityId": "ug",
      "faculty": "College of Basic and Applied Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "fee-paying",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 15,
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
          "Full-fee-paying admission. The regular-track cut-off is lower."
        ]
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
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
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-materials-science-and-engineering",
      "name": "Materials Science and Engineering",
      "universityId": "ug",
      "faculty": "College of Basic and Applied Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 13,
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
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-materials-science-and-engineering-fee-paying",
      "name": "Materials Science and Engineering",
      "universityId": "ug",
      "faculty": "College of Basic and Applied Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "fee-paying",
      "qualificationLevel": "degree",
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
            "subject": "Elective Mathematics",
            "minimumGrade": "B3"
          }
        ],
        "notes": [
          "Full-fee-paying admission. The regular-track cut-off is lower."
        ]
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-mathematical-sciences",
      "name": "Mathematical Sciences",
      "universityId": "ug",
      "faculty": "College of Basic and Applied Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Elective Mathematics",
            "minimumGrade": "B3"
          }
        ],
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-mathematical-sciences-fee-paying",
      "name": "Mathematical Sciences",
      "universityId": "ug",
      "faculty": "College of Basic and Applied Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "fee-paying",
      "qualificationLevel": "degree",
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
            "subject": "Elective Mathematics",
            "minimumGrade": "B3"
          }
        ],
        "notes": [
          "Full-fee-paying admission. The regular-track cut-off is lower."
        ]
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-mathematics-education",
      "name": "Mathematics Education",
      "universityId": "ug",
      "faculty": "College of Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
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
      "faculty": "College of Health Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Korle Bu)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-medicine-and-surgery",
      "name": "Medicine and Surgery",
      "universityId": "ug",
      "faculty": "College of Health Sciences",
      "degreeType": "MBChB",
      "durationYears": 6,
      "campus": "Accra (Korle Bu)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-midwifery",
      "name": "Midwifery",
      "universityId": "ug",
      "faculty": "College of Health Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-music",
      "name": "Music",
      "universityId": "ug",
      "faculty": "School of Performing Arts",
      "degreeType": "BMus",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": [
          "Audition or interview required."
        ]
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-music-fee-paying",
      "name": "Music",
      "universityId": "ug",
      "faculty": "School of Performing Arts",
      "degreeType": "BMus",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "fee-paying",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "Audition or interview required.",
          "Full-fee-paying admission. The regular-track cut-off is lower."
        ]
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
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
      "faculty": "College of Health Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-occupational-therapy",
      "name": "Occupational Therapy",
      "universityId": "ug",
      "faculty": "College of Health Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Korle Bu)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 14,
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
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-performing-arts-education",
      "name": "Performing Arts Education",
      "universityId": "ug",
      "faculty": "College of Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
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
      "faculty": "College of Health Sciences",
      "degreeType": "PharmD",
      "durationYears": 6,
      "campus": "Accra (Korle Bu)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-physical-sciences",
      "name": "Physical Sciences",
      "universityId": "ug",
      "faculty": "College of Basic and Applied Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Physics",
            "minimumGrade": "C6"
          }
        ],
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-physical-sciences-fee-paying",
      "name": "Physical Sciences",
      "universityId": "ug",
      "faculty": "College of Basic and Applied Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "fee-paying",
      "qualificationLevel": "degree",
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
            "subject": "Physics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "Full-fee-paying admission. The regular-track cut-off is lower."
        ]
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-physiotherapy",
      "name": "Physiotherapy",
      "universityId": "ug",
      "faculty": "College of Health Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Korle Bu)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 14,
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
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
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
      "faculty": "College of Basic and Applied Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-psychology-fee-paying",
      "name": "Psychology",
      "universityId": "ug",
      "faculty": "College of Basic and Applied Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "fee-paying",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "Full-fee-paying admission. The regular-track cut-off is lower."
        ]
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
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
      "faculty": "College of Health Sciences",
      "degreeType": "BPH",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-respiratory-therapy",
      "name": "Respiratory Therapy",
      "universityId": "ug",
      "faculty": "College of Health Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra (Korle Bu)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 14,
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
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-science-education-biology",
      "name": "Science Education (Biology)",
      "universityId": "ug",
      "faculty": "College of Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-science-education-chemistry",
      "name": "Science Education (Chemistry)",
      "universityId": "ug",
      "faculty": "College of Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [
          {
            "subject": "Chemistry",
            "minimumGrade": "C6"
          }
        ],
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-science-education-physics",
      "name": "Science Education (Physics)",
      "universityId": "ug",
      "faculty": "College of Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [
          {
            "subject": "Physics",
            "minimumGrade": "C6"
          }
        ],
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-social-studies-education",
      "name": "Social Studies Education",
      "universityId": "ug",
      "faculty": "College of Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-spanish-education",
      "name": "Spanish Education",
      "universityId": "ug",
      "faculty": "College of Education",
      "degreeType": "B.Ed",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-sports-and-physical-culture",
      "name": "Sports and Physical Culture",
      "universityId": "ug",
      "faculty": "College of Education",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Integrated Science",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-veterinary-medicine",
      "name": "Veterinary Medicine",
      "universityId": "ug",
      "faculty": "College of Basic and Applied Sciences",
      "degreeType": "DVM",
      "durationYears": 6,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 14,
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
        "notes": []
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "ug-veterinary-medicine-fee-paying",
      "name": "Veterinary Medicine",
      "universityId": "ug",
      "faculty": "College of Basic and Applied Sciences",
      "degreeType": "DVM",
      "durationYears": 6,
      "campus": "Accra (Legon)",
      "region": "Greater Accra",
      "admissionTrack": "fee-paying",
      "qualificationLevel": "degree",
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
          "Full-fee-paying admission. The regular-track cut-off is lower."
        ]
      },
      "provenance": {
        "source": "University of Ghana, Cut-Off Points for 2025/2026 Undergraduate Admissions",
        "sourceUrl": "https://admissions.ug.edu.gh/undergraduate/cut-off",
        "year": 2025,
        "lastVerified": "2026-08-07",
        "confidence": "authoritative"
      }
    },
    {
      "id": "uhas-dietetics",
      "name": "Dietetics",
      "universityId": "uhas",
      "faculty": "School of Allied Health Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Ho",
      "region": "Volta",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UHAS programme catalogue. No published per-programme cut-off list was found; these are estimates.",
        "sourceUrl": "https://uhas.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uhas-medical-laboratory-technology",
      "name": "Medical Laboratory Technology",
      "universityId": "uhas",
      "faculty": "School of Allied Health Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Ho",
      "region": "Volta",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Chemistry",
            "minimumGrade": "C6"
          },
          {
            "subject": "Biology",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UHAS programme catalogue. No published per-programme cut-off list was found; these are estimates.",
        "sourceUrl": "https://uhas.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uhas-medicine",
      "name": "Medicine",
      "universityId": "uhas",
      "faculty": "School of Medicine",
      "degreeType": "MBChB",
      "durationYears": 6,
      "campus": "Ho",
      "region": "Volta",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Biology",
            "minimumGrade": "C6"
          },
          {
            "subject": "Chemistry",
            "minimumGrade": "C6"
          },
          {
            "subject": "Physics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UHAS programme catalogue. No published per-programme cut-off list was found; these are estimates.",
        "sourceUrl": "https://uhas.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uhas-midwifery",
      "name": "Midwifery",
      "universityId": "uhas",
      "faculty": "School of Nursing and Midwifery",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Ho",
      "region": "Volta",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 16,
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UHAS programme catalogue. No published per-programme cut-off list was found; these are estimates.",
        "sourceUrl": "https://uhas.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uhas-nursing",
      "name": "Nursing",
      "universityId": "uhas",
      "faculty": "School of Nursing and Midwifery",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Ho",
      "region": "Volta",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 16,
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UHAS programme catalogue. No published per-programme cut-off list was found; these are estimates.",
        "sourceUrl": "https://uhas.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uhas-nutrition",
      "name": "Nutrition",
      "universityId": "uhas",
      "faculty": "School of Allied Health Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Ho",
      "region": "Volta",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UHAS programme catalogue. No published per-programme cut-off list was found; these are estimates.",
        "sourceUrl": "https://uhas.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uhas-pharmacy",
      "name": "Pharmacy",
      "universityId": "uhas",
      "faculty": "School of Pharmacy",
      "degreeType": "PharmD",
      "durationYears": 6,
      "campus": "Ho",
      "region": "Volta",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UHAS programme catalogue. No published per-programme cut-off list was found; these are estimates.",
        "sourceUrl": "https://uhas.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uhas-physiotherapy-and-sports-science",
      "name": "Physiotherapy and Sports Science",
      "universityId": "uhas",
      "faculty": "School of Allied Health Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Ho",
      "region": "Volta",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UHAS programme catalogue. No published per-programme cut-off list was found; these are estimates.",
        "sourceUrl": "https://uhas.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uhas-public-health-disease-control",
      "name": "Public Health (Disease Control)",
      "universityId": "uhas",
      "faculty": "School of Public Health",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Ho",
      "region": "Volta",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UHAS programme catalogue. No published per-programme cut-off list was found; these are estimates.",
        "sourceUrl": "https://uhas.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "uhas-public-health-health-promotion",
      "name": "Public Health (Health Promotion)",
      "universityId": "uhas",
      "faculty": "School of Public Health",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Ho",
      "region": "Volta",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UHAS programme catalogue. No published per-programme cut-off list was found; these are estimates.",
        "sourceUrl": "https://uhas.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "upsa-accounting",
      "name": "Accounting",
      "universityId": "upsa",
      "faculty": "Faculty of Accounting and Finance",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 16,
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
          }
        ],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UPSA programme catalogue. No published per-programme cut-off list was found; these are estimates.",
        "sourceUrl": "https://upsa.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "upsa-accounting-distance",
      "name": "Accounting",
      "universityId": "upsa",
      "faculty": "Faculty of Accounting and Finance",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra",
      "region": "Greater Accra",
      "admissionTrack": "distance",
      "qualificationLevel": "degree",
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
          "Distance-learning intake, which has its own cut-off.",
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UPSA programme catalogue. No published per-programme cut-off list was found; these are estimates.",
        "sourceUrl": "https://upsa.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "upsa-banking-and-finance",
      "name": "Banking and Finance",
      "universityId": "upsa",
      "faculty": "Faculty of Accounting and Finance",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
            "subject": "Social Studies",
            "minimumGrade": "C6"
          }
        ],
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UPSA programme catalogue. No published per-programme cut-off list was found; these are estimates.",
        "sourceUrl": "https://upsa.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "upsa-business-administration",
      "name": "Business Administration",
      "universityId": "upsa",
      "faculty": "Faculty of Management Studies",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UPSA programme catalogue. No published per-programme cut-off list was found; these are estimates.",
        "sourceUrl": "https://upsa.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "upsa-business-administration-distance",
      "name": "Business Administration",
      "universityId": "upsa",
      "faculty": "Faculty of Management Studies",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra",
      "region": "Greater Accra",
      "admissionTrack": "distance",
      "qualificationLevel": "degree",
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
          "Distance-learning intake, which has its own cut-off.",
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UPSA programme catalogue. No published per-programme cut-off list was found; these are estimates.",
        "sourceUrl": "https://upsa.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "upsa-business-information-systems",
      "name": "Business Information Systems",
      "universityId": "upsa",
      "faculty": "Faculty of Information Technology and Communication Studies",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UPSA programme catalogue. No published per-programme cut-off list was found; these are estimates.",
        "sourceUrl": "https://upsa.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "upsa-human-resource-management",
      "name": "Human Resource Management",
      "universityId": "upsa",
      "faculty": "Faculty of Management Studies",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UPSA programme catalogue. No published per-programme cut-off list was found; these are estimates.",
        "sourceUrl": "https://upsa.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "upsa-information-technology-management",
      "name": "Information Technology Management",
      "universityId": "upsa",
      "faculty": "Faculty of Information Technology and Communication Studies",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UPSA programme catalogue. No published per-programme cut-off list was found; these are estimates.",
        "sourceUrl": "https://upsa.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "upsa-law",
      "name": "Law",
      "universityId": "upsa",
      "faculty": "Faculty of Law",
      "degreeType": "LLB",
      "durationYears": 4,
      "campus": "Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
      "requirements": {
        "minimumAggregate": 14,
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UPSA programme catalogue. No published per-programme cut-off list was found; these are estimates.",
        "sourceUrl": "https://upsa.edu.gh/admissions",
        "year": 2026,
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
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UPSA programme catalogue. No published per-programme cut-off list was found; these are estimates.",
        "sourceUrl": "https://upsa.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "upsa-procurement-and-supply-chain-management",
      "name": "Procurement and Supply Chain Management",
      "universityId": "upsa",
      "faculty": "Faculty of Management Studies",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UPSA programme catalogue. No published per-programme cut-off list was found; these are estimates.",
        "sourceUrl": "https://upsa.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "upsa-public-relations-management",
      "name": "Public Relations Management",
      "universityId": "upsa",
      "faculty": "Faculty of Information Technology and Communication Studies",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "UPSA programme catalogue. No published per-programme cut-off list was found; these are estimates.",
        "sourceUrl": "https://upsa.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "valley-view-accounting",
      "name": "Accounting",
      "universityId": "valley-view",
      "faculty": "School of Business",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Oyibi",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [
          {
            "subject": "Financial Accounting",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Valley View University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://vvu.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "valley-view-agriculture",
      "name": "Agriculture",
      "universityId": "valley-view",
      "faculty": "School of Agriculture",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Oyibi",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Valley View University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://vvu.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "valley-view-business-administration",
      "name": "Business Administration",
      "universityId": "valley-view",
      "faculty": "School of Business",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Oyibi",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Valley View University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://vvu.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "valley-view-business-administration-distance",
      "name": "Business Administration",
      "universityId": "valley-view",
      "faculty": "School of Business",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Oyibi",
      "region": "Greater Accra",
      "admissionTrack": "distance",
      "qualificationLevel": "degree",
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
          "Distance-learning intake, which has its own cut-off.",
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Valley View University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://vvu.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "valley-view-computer-science",
      "name": "Computer Science",
      "universityId": "valley-view",
      "faculty": "School of Computing",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Oyibi",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [
          {
            "subject": "Elective Mathematics",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Valley View University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://vvu.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "valley-view-development-studies",
      "name": "Development Studies",
      "universityId": "valley-view",
      "faculty": "Faculty of Arts and Social Sciences",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Oyibi",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Valley View University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://vvu.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "valley-view-information-technology",
      "name": "Information Technology",
      "universityId": "valley-view",
      "faculty": "School of Computing",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Oyibi",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Valley View University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://vvu.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "valley-view-nursing",
      "name": "Nursing",
      "universityId": "valley-view",
      "faculty": "School of Nursing and Midwifery",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "Oyibi",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Valley View University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://vvu.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "valley-view-theology",
      "name": "Theology",
      "universityId": "valley-view",
      "faculty": "School of Theology and Missions",
      "degreeType": "BA",
      "durationYears": 4,
      "campus": "Oyibi",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Valley View University programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://vvu.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "wisconsin-accounting",
      "name": "Accounting",
      "universityId": "wisconsin",
      "faculty": "Faculty of Business Administration",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "North Legon, Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
        "electiveSubjects": [
          {
            "subject": "Financial Accounting",
            "minimumGrade": "C6"
          }
        ],
        "notes": [
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Wisconsin International University College programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://wiuc-ghana.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "wisconsin-business-administration",
      "name": "Business Administration",
      "universityId": "wisconsin",
      "faculty": "Faculty of Business Administration",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "North Legon, Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Wisconsin International University College programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://wiuc-ghana.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "wisconsin-business-administration-distance",
      "name": "Business Administration",
      "universityId": "wisconsin",
      "faculty": "Faculty of Business Administration",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "North Legon, Accra",
      "region": "Greater Accra",
      "admissionTrack": "distance",
      "qualificationLevel": "degree",
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
          "Distance-learning intake, which has its own cut-off.",
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Wisconsin International University College programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://wiuc-ghana.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "wisconsin-information-technology",
      "name": "Information Technology",
      "universityId": "wisconsin",
      "faculty": "Faculty of Information Technology",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "North Legon, Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Wisconsin International University College programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://wiuc-ghana.edu.gh/admissions",
        "year": 2026,
        "lastVerified": "2026-08-07",
        "confidence": "estimated"
      }
    },
    {
      "id": "wisconsin-nursing",
      "name": "Nursing",
      "universityId": "wisconsin",
      "faculty": "Faculty of Health Sciences",
      "degreeType": "BSc",
      "durationYears": 4,
      "campus": "North Legon, Accra",
      "region": "Greater Accra",
      "admissionTrack": "regular",
      "qualificationLevel": "degree",
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
          "No per-programme cut-off is published for this university. This shows the general minimum for admission and must not be relied on as a programme cut-off."
        ]
      },
      "provenance": {
        "source": "Wisconsin International University College programme catalogue. This institution does not publish a per-programme cut-off list, so records show the national minimum aggregate for degree admission.",
        "sourceUrl": "https://wiuc-ghana.edu.gh/admissions",
        "year": 2026,
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
