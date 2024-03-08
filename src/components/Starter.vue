<template>
	<div v-if="level === 0">
		<h2>Prénom enqueteur :</h2>
		<input class="form-control" type="text" v-model="enqueteur" />
		<button v-if="enqueteur" @click="next" class="btn-next">Suivant</button>
		<button @click="downloadData" class="btn-fin">download</button>
	</div>

	<div v-if="level === 1" class="form-group">
		<h1>Poste enquêteur</h1>
		<select v-model="poste" class="form-control">
			<option v-for="option in postes" :key="option.id" :value="option.output">
				{{ option.text }}
			</option>
		</select>
		<button v-if="poste" @click="next" class="btn-next">Suivant</button>
		<button @click="back" class="btn-return">retour</button>
	</div>


	<div v-if="level === 2" class="colonne disable-dbl-tap-zoom">
		<button type="button" @click="addCounter">Compteur: {{ count }}</button>
		<br>
		<br>
		<br>
		<br>
		<button type="button" @click="fileVide">File Vide: {{ vide }}</button>
		<br><br>
		<button @click="exit" class="btn-fin">Fin</button>
	</div>

</template>

<script setup>
import { ref } from "vue";
import { db } from "../firebaseConfig";
import { postes } from "./reponses";
import { collection, getDocs, addDoc } from "firebase/firestore";
import * as XLSX from "xlsx";

const surveyCollectionRef = collection(db, "gdn");
const level = ref(0);
const enqueteur = ref('');
const poste = ref('');
const count = ref(0);
const vide = ref(0);


const next = () => {
	level.value++;
}

const back = () => {
	level.value--;
}

const exit = () => {
	level.value = 0;
}

const addCounter = async () => {
	try {
		await addDoc(surveyCollectionRef, {
			ENQUETEUR: enqueteur.value,
			POSTE: poste.value,
			DATE: new Date().toLocaleDateString("fr-FR").replace(/\//g, "-"),
			HORODATAGE: new Date().toLocaleTimeString("fr-FR").slice(0, 8),
		});
		count.value++;
	} catch (error) {
		console.error("Error adding document: ", error);
	}
};


const fileVide = async () => {
	await addDoc(surveyCollectionRef, {
		ENQUETEUR: enqueteur.value,
		POSTE: poste.value,
		DATE: new Date().toLocaleDateString("fr-FR").replace(/\//g, "-"),
		AUCUNPASSAGE: new Date().toLocaleTimeString("fr-FR").slice(0, 8),
	});
	vide.value++;
};

const downloadData = async () => {
	try {
		const querySnapshot = await getDocs(surveyCollectionRef);
		let data = [];
		let maxWidths = {}; // Object to keep track of maximum width for each column

		// Define your headers
		const headers = {
			ID_questionnaire: "ID_questionnaire",
			ENQUETEUR: "ENQUETEUR",
			DATE: "DATE",
			POSTE: "POSTE",
			HORODATAGE: "HORODATAGE",
			AUCUNPASSAGE: "AUCUN PASSAGE"
		};

		// Initialize maxWidths with header lengths
		Object.keys(headers).forEach((key) => {
			maxWidths[key] = headers[key].length;
		});

		querySnapshot.forEach((doc) => {
			let docData = doc.data();
			let mappedData = {
				ID_questionnaire: doc.id,
				ENQUETEUR: docData.ENQUETEUR || "",
				DATE: docData.DATE || "",
				HORODATAGE: docData.HORODATAGE || "",
				POSTE: docData.POSTE || "",
				AUCUNPASSAGE: docData.AUCUNPASSAGE || "",

			};
			data.push(mappedData);

			// Update maxWidths for each key in mappedData
			Object.keys(mappedData).forEach((key) => {
				const valueLength = mappedData[key].toString().length;
				maxWidths[key] = Math.max(maxWidths[key], valueLength);
			});
		});

		// Convert data to a worksheet
		const worksheet = XLSX.utils.json_to_sheet(data, {
			header: Object.keys(headers),
			skipHeader: false,
		});

		// Set the widths for each column
		worksheet["!cols"] = Object.keys(maxWidths).map((key) => ({
			wch: maxWidths[key] + 2 // +2 for a little extra padding
		}));

		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

		// Export the workbook to a .xlsx file
		XLSX.writeFile(workbook, "OdSens.xlsx");
	} catch (error) {
		console.error("Error downloading data: ", error);
	}
};

</script>
// ID_ENQUETE: surveyNumber.value,
// ID_ENQUETE: "ID_ENQUETE",

// const surveyNumber;
// const fetchSurveyNumber = async () => {
// const surveyRef = doc(db, "Counters", "sens");
// const docSnap = await getDoc(surveyRef);
// if (docSnap.exists() && docSnap.data().numero !== undefined) {
// surveyNumber.value = docSnap.data().numero;
// console.log(surveyNumber.value)
// } else {
// console.log("No such document or 'numero' field is missing!");
// }
// };

// Function to increment and update the survey number in Firebase
// const updateSurveyNumber = async () => {
// const newNumber = surveyNumber.value + 1; // Increment the survey number
// const surveyRef = doc(db, "Counters", "sens");
// await updateDoc(surveyRef, {
// counter: newNumber
// });
// surveyNumber.value = newNumber; // Update the local ref
// };
<style>
.disable-dbl-tap-zoom {
	touch-action: manipulation;
}

body {
	background-color: #2a3b63;
}

.logo {
	padding: 10%;
	height: 3em;
}

h1 {
	text-align: center;
	color: #4caf50;
}

h2 {
	color: white;
}

.container {
	background-color: #2a3b63;
	color: white;
	padding: 5% 0;
	width: 75%;
	margin: auto;
}

.btn-next {
	width: 100%;
	background-color: green;
	color: white;
	padding: 20px 20px;
	margin-top: 3em;
	border: none;
	border-radius: 5px;
	cursor: pointer;
}

.btn-fin {
	width: 100%;
	background-color: #4c4faf;
	color: white;
	padding: 20px 20px;
	margin-top: 5%;
	border: none;
	border-radius: 5px;
	cursor: pointer;
}

.btn-return {
	width: 100%;
	background-color: #898989;
	color: white;
	padding: 20px 20px;
	margin-top: 5%;
	border: none;
	border-radius: 5px;
	cursor: pointer;
}

.btn-fin:hover {
	background-color: red;
}

.commune-dropdown {
	/* Style your dropdown list here */
	list-style-type: none;
	padding: 0;
	margin: 0;
	border: 1px solid #ccc;
	border-radius: 4px;
	max-height: 200px;
	overflow-y: auto;
}

.form-control {
	width: 100%;
	border-radius: 5px;
	border: 1px solid white;
	background-color: #333;
	color: white;
	text-transform: uppercase;
	font-weight: bolder;
}

input.form-control {
	width: 93%;
}

.commune-dropdown li {
	padding: 5px 10px;
	cursor: pointer;
}

.colonne {
	display: flex;
	flex-direction: column;
	padding-top: 2%;
}

*:focus {
	outline: none;
}

.commune-dropdown li:hover {
	background-color: #f0f0f0;
}

input,
select,
button {
	font-size: 16px;
	padding: 10px;
}
</style>