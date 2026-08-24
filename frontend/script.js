const API_URL = import.meta.env.VITE_API_URL;


// --------------------------------
// ELEMENTS
// --------------------------------

const form = document.getElementById("predictionForm");

const predictButton = document.getElementById("predictButton");
const buttonText = document.getElementById("buttonText");
const spinner = document.getElementById("spinner");

const resultPlaceholder =
    document.getElementById("resultPlaceholder");

const resultContent =
    document.getElementById("resultContent");

const scoreValue =
    document.getElementById("scoreValue");

const resultTitle =
    document.getElementById("resultTitle");

const resultDescription =
    document.getElementById("resultDescription");

const resetButton =
    document.getElementById("resetButton");

const againButton =
    document.getElementById("againButton");


// --------------------------------
// RANGE SLIDERS
// --------------------------------

const usageHours = document.getElementById("usageHours");
const usageValue = document.getElementById("usageValue");

const dailyUnlocks = document.getElementById("dailyUnlocks");
const unlockValue = document.getElementById("unlockValue");

const studyHours = document.getElementById("studyHours");
const studyValue = document.getElementById("studyValue");

const physicalActivity =
    document.getElementById("physicalActivity");

const activityValue =
    document.getElementById("activityValue");

const sleepHours =
    document.getElementById("sleepHours");

const sleepValue =
    document.getElementById("sleepValue");


usageHours.addEventListener("input", () => {
    usageValue.textContent = usageHours.value;
});


dailyUnlocks.addEventListener("input", () => {
    unlockValue.textContent = dailyUnlocks.value;
});


studyHours.addEventListener("input", () => {
    studyValue.textContent = studyHours.value;
});


physicalActivity.addEventListener("input", () => {
    activityValue.textContent = physicalActivity.value;
});


sleepHours.addEventListener("input", () => {
    sleepValue.textContent = sleepHours.value;
});


// --------------------------------
// API STATUS
// --------------------------------

async function checkAPI() {

    const statusDot =
        document.getElementById("statusDot");

    const statusText =
        document.getElementById("statusText");

    try {

        const response =
            await fetch(`${API_URL}/`);

        if (response.ok) {

            statusDot.style.background =
                "#38d39f";

            statusText.textContent =
                "API Connected";

        } else {

            throw new Error();

        }

    } catch (error) {

        statusDot.style.background =
            "#ff5c7a";

        statusText.textContent =
            "API Offline";
    }
}

checkAPI();


// --------------------------------
// GET STRESS LEVEL
// --------------------------------

function getStressLevel() {

    const selected =
        document.querySelector(
            'input[name="stress"]:checked'
        );

    return selected ? selected.value : null;
}


// --------------------------------
// FORM SUBMIT
// --------------------------------

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const stressLevel =
        getStressLevel();

    if (!stressLevel) {

        alert("Please select your stress level.");

        return;
    }


    // --------------------------------
    // BUILD JSON
    // --------------------------------

    const data = {

        Age: Number(
            document.getElementById("age").value
        ),

        Gender:
            document.getElementById("gender").value,

        Country:
            document.getElementById("country").value,

        Academic_Level:
            document.getElementById("academicLevel").value,

        Most_Used_Platform:
            document.getElementById("platform").value,

        Purpose_Of_Use:
            document.getElementById("purpose").value,

        Avg_Daily_Usage_Hours:
            Number(usageHours.value),

        Daily_Unlocks:
            Number(dailyUnlocks.value),

        Study_Hours:
            Number(studyHours.value),

        Physical_Activity_Hours:
            Number(physicalActivity.value),

        Sleep_Hours_Per_Night:
            Number(sleepHours.value),

        Stress_Level:
            stressLevel
    };


    // --------------------------------
    // LOADING
    // --------------------------------

    predictButton.disabled = true;

    buttonText.style.display = "none";
    spinner.style.display = "block";


    try {

        const response = await fetch(
            `${API_URL}/predict`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(data)
            }
        );


        if (!response.ok) {

            const errorData =
                await response.json();

            console.error(errorData);

            throw new Error(
                "Prediction request failed."
            );
        }


        const result =
            await response.json();


        console.log(
            "Prediction:",
            result
        );


        // --------------------------------
        // SHOW RESULT
        // --------------------------------

        showResult(
            result.predicted_mental_health_score
        );


    } catch (error) {

        console.error(error);

        alert(
            "Unable to connect to the prediction API.\n\n" +
            "Make sure FastAPI is running at:\n" +
            API_URL
        );

    } finally {

        predictButton.disabled = false;

        buttonText.style.display = "block";
        spinner.style.display = "none";
    }

});


// --------------------------------
// SHOW RESULT
// --------------------------------

function showResult(score) {

    resultPlaceholder.hidden = true;
    resultContent.hidden = false;


    // Animate score

    animateScore(score);


    // Generate interpretation

    let title;
    let description;


    /*
       The backend only tells us the numerical
       prediction. These labels are frontend
       interpretations, not model output.
    */

    if (score < 30) {

        title = "Lower Score Range";

        description =
            "The predicted score falls in a lower range. " +
            "Consider paying attention to your sleep, " +
            "physical activity, stress and daily routine.";

    } else if (score < 60) {

        title = "Moderate Score Range";

        description =
            "The predicted score falls in a moderate range. " +
            "Maintaining a balanced routine and managing " +
            "stress may be helpful.";

    } else if (score < 80) {

        title = "Good Score Range";

        description =
            "The predicted score falls in a relatively " +
            "good range based on the model prediction.";

    } else {

        title = "Higher Score Range";

        description =
            "The predicted score is in a higher range " +
            "according to the model.";
    }


    resultTitle.textContent = title;
    resultDescription.textContent = description;


    // Scroll result into view on mobile

    if (window.innerWidth < 950) {

        document
            .getElementById("resultCard")
            .scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

    }

}


// --------------------------------
// SCORE ANIMATION
// --------------------------------

function animateScore(targetScore) {

    const duration = 1200;

    const startTime = performance.now();


    function update(currentTime) {

        const elapsed =
            currentTime - startTime;

        const progress =
            Math.min(elapsed / duration, 1);


        // Smooth easing

        const eased =
            1 - Math.pow(1 - progress, 3);


        const current =
            targetScore * eased;


        scoreValue.textContent =
            current.toFixed(2);


        if (progress < 1) {

            requestAnimationFrame(update);

        } else {

            scoreValue.textContent =
                Number(targetScore).toFixed(2);
        }
    }


    requestAnimationFrame(update);
}


// --------------------------------
// RESET
// --------------------------------

function resetForm() {

    form.reset();


    usageHours.value = 6;
    usageValue.textContent = "6";

    dailyUnlocks.value = 0;
    unlockValue.textContent = "0";

    studyHours.value = 0;
    studyValue.textContent = "0";

    physicalActivity.value = 0;
    activityValue.textContent = "0";

    sleepHours.value = 0;
    sleepValue.textContent = "0";


    resultContent.hidden = true;
    resultPlaceholder.hidden = false;


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


resetButton.addEventListener(
    "click",
    resetForm
);


againButton.addEventListener(
    "click",
    resetForm
);