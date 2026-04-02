import { analyzeLegalDocument } from '../utils/ai-document-parser.js';

async function runTest() {
    console.log("🚀 Démarrage du test d'audit documentaire IA...");

    // Simulation d'un fichier "Titre de Propriété"
    const mockFile = {
        originalname: "Titre_Foncier_N_12345_Dakar.pdf",
        mimetype: "application/pdf",
        size: 2500000 // 2.5 MB
    };

    try {
        const result = await analyzeLegalDocument(mockFile);

        console.log("\n--- Résultat de l'Audit IA ---");
        console.log(`✅ Valide : ${result.isValid}`);
        console.log(`🏢 Autorité : ${result.extractedAuthority}`);
        console.log(`📅 Expiration : ${result.expirationDate}`);
        
        if (result.isValid) {
            console.log("\n🎉 Succès : Le document a été authentifié avec succès.");
        } else {
            console.log(`\n❌ Échec : ${result.rejectionReason}`);
        }

        console.log("\n--- Logs IA ---");
        console.log(JSON.stringify(result.rawLog, null, 2));

    } catch (error) {
        console.error("❌ Erreur pendant le test :", error);
    }
}

runTest();
