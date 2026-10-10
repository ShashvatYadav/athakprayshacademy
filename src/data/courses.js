// Course groups. Set `show: false` to hide one (e.g. Agniveer until confirmed).
export const courses = [
  {
    id: "school",
    title: "School Classes (6–12)",
    description: "Tuition for students of Classes 6 to 12 following the UP Board or CBSE Board syllabus.",
    label: "Classes 6–12",
    image: "/generated/classroom-wide.jpg",
    imageWidth: 1600,
    imageHeight: 722,
    imagePosition: "50% 50%",
    bullets: ["UP Board and CBSE support", "Classes 6 through 12", "Regular teaching and practice"],
    show: true,
  },
  {
    id: "subjects",
    title: "Subject Support: Maths, English, Science",
    description: "Regular teaching and practice in Maths, English and Science, taken by our subject teachers.",
    label: "Subject support",
    image: null,
    subjects: ["Mathematics", "English", "Science"],
    bullets: ["Mathematics", "English", "Science"],
    show: true,
  },
  {
    id: "entrance",
    title: "Entrance Exam Preparation: JNVST, CHS, BHU",
    description:
      "Preparation for school-entrance exams. We are a coaching academy and are not affiliated with the exam bodies or institutions.",
    label: "Entrance",
    image: "/media/coursesoffer.jpeg",
    imageWidth: 1067,
    imageHeight: 1600,
    imageFit: "contain",
    imagePosition: "50% 50%",
    bullets: ["JNVST", "CHS", "BHU"],
    show: true,
  },
  {
    id: "nmms",
    title: "NMMS Preparation (Class 8)",
    description:
      "Foundation and target preparation for the UP NMMS exam, with practice questions and tests. Please ask us for the current batch details.",
    label: "Class 8",
    image: "/media/nmmsstudybook.jpeg",
    imageWidth: 738,
    imageHeight: 1078,
    imageFit: "contain",
    imagePosition: "50% 50%",
    bullets: ["UP NMMS preparation", "Practice questions", "Tests"],
    show: true,
  },
  {
    id: "agniveer",
    title: "Agniveer Preparation",
    description: "Preparation support for the Agniveer exam. Please ask us whether a batch is currently running.",
    label: "Defence exam",
    image: "/media/agneeveer.jpeg",
    imageWidth: 1600,
    imageHeight: 1066,
    bullets: ["Agniveer preparation support", "Ask whether a batch is running"],
    // TODO: confirm with the academy that this is currently offered.
    show: true,
  },
];

export const classOptions = ["6", "7", "8", "9", "10", "11", "12", "Other"];
