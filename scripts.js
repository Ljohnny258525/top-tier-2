document.getElementById("bank-analysis-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
        const response = await fetch("/analyze", {
            method: "POST",
            body: formData,
        });
        if (response.ok) {
            const result = await response.json();
            const resultContainer = document.createElement('div');
            resultContainer.id = 'result-display';
            resultContainer.innerHTML = `<p><strong>Analysis Complete:</strong> ${result.details}</p>`;
            document.getElementById('bank-analysis-form').appendChild(resultContainer);
        } else {
            const errorContainer = document.createElement('div');
            errorContainer.id = 'error-display';
            errorContainer.style.color = 'red';
            errorContainer.innerHTML = `<p>Error analyzing the document. Please try again.</p>`;
            document.getElementById('bank-analysis-form').appendChild(errorContainer);
        }
    } catch (error) {
        console.error("Error:", error);
    }
});

document.getElementById("bank-statement").addEventListener("change", (event) => {
    const file = event.target.files[0];
    const validExtensions = ['pdf', 'csv', 'xlsx'];
    const fileExtension = file.name.split('.').pop();
    if (!validExtensions.includes(fileExtension)) {
        alert("Invalid file type. Please upload a PDF, CSV, or Excel file.");
        event.target.value = ""; // Clear the input
    }
});
