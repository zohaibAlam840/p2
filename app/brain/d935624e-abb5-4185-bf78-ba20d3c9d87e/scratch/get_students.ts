
import { db } from "../app/lib/firebase";
import { collection, getDocs, limit, query } from "firebase/firestore";

async function getSampleStudents() {
  try {
    const q = query(collection(db, "students"), limit(5));
    const snap = await getDocs(q);
    if (snap.empty) {
      console.log("No students found in the 'students' collection.");
      return;
    }
    console.log("Sample Student IDs:");
    snap.docs.forEach(doc => {
      console.log(`- Name: ${doc.data().name}, Student ID: ${doc.data().studentId}`);
    });
  } catch (err) {
    console.error("Error fetching students:", err);
  }
}

getSampleStudents();
