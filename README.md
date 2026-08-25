# 🧠 MindScore AI — Mental Health Prediction

> A machine learning web application that predicts a student's mental health score from social-media usage, academic habits, lifestyle factors, and stress level.

**Live Project:** https://mental-health-prediction-score-oth9xmeky.vercel.app/

**Backend API:** https://mental-health-prediction-score-0r42.onrender.com

---

## 📌 Overview

**MindScore AI** is a full-stack machine learning application built to demonstrate the complete ML workflow — from exploratory data analysis and feature engineering to model training, serialization, API development, frontend integration, and cloud deployment.

The project predicts the `Mental_Health_Score` as a continuous numerical value, making this a **regression problem**.

The application collects information such as:

- Age and gender
- Country
- Academic level
- Most-used social-media platform
- Purpose of social-media usage
- Average daily social-media usage
- Daily phone/social-media unlocks
- Study hours
- Physical activity
- Sleep hours
- Stress level

The trained machine learning pipeline is served through a **FastAPI** backend. The frontend is built using **HTML, CSS, and JavaScript** and communicates with the API using HTTP requests.

---

## ✨ Features

- 🧠 Machine-learning-based mental health score prediction
- 📊 Regression model for continuous score prediction
- 🧹 Data cleaning and feature engineering
- 🔤 Ordinal and one-hot encoding for categorical variables
- 🔄 Reusable scikit-learn preprocessing pipeline
- 🌲 Random Forest regression
- 🔎 Randomized hyperparameter search during experimentation
- ⚡ FastAPI prediction API
- ✅ Pydantic input validation
- 🌐 CORS support for frontend/API communication
- 📡 Live API status indicator
- 📈 Animated prediction score on the frontend
- 📱 Responsive frontend design
- ☁️ Frontend deployed on Vercel
- ☁️ Backend deployed on Render

---

## 🏗️ Project Architecture

```text
                    ┌──────────────────────┐
                    │      User / Browser  │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   HTML / CSS / JS    │
                    │      Frontend        │
                    │      (Vercel)        │
                    └──────────┬───────────┘
                               │
                         POST /predict
                               │
                               ▼
                    ┌──────────────────────┐
                    │      FastAPI         │
                    │      Backend         │
                    │      (Render)        │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Saved ML Pipeline     │
                    │ Mental_Health_Model   │
                    │       .pkl            │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Predicted Mental     │
                    │ Health Score          │
                    └──────────────────────┘
```

---

## 📂 Project Structure

```text
ml-fastapi-project/
│
├── app/
│   ├── __init__.py
│   ├── main.py
│   └── Mental_Health_Model.pkl
│
├── frontend/
│   ├── index.html
│   ├── scripts.js
│   └── style.css
│
├── requirements.txt
│
└── README.md
```

> The frontend source provided for the project references `script.js`. If your actual repository file is named `scripts.js`, make sure the filename referenced by `index.html` matches the real file name.

---

# 🤖 Machine Learning

## Dataset

The notebook uses:

```text
Student Social Media And Mental Health Impact.csv
```

The dataset contains **5,000 students** and includes demographic, social-media, academic, lifestyle, and stress-related variables.

The target variable is:

```text
Mental_Health_Score
```

The notebook treats this as a **regression target** because the target is continuous.

---

## 🔍 Exploratory Data Analysis

The notebook performs EDA including:

- Dataset shape and columns
- Missing-value inspection
- Duplicate inspection
- Data-type inspection
- Descriptive statistics
- Target distribution
- Numeric correlation analysis
- Stress level vs. mental health score
- Social-media usage vs. mental health score
- Sleep hours vs. mental health score
- Most-used platform distribution
- Numerical outlier analysis

---

## 🧹 Data Cleaning

The project removes duplicate rows and clips negative values from:

```text
Physical_Activity_Hours
```

The notebook also examines numerical feature skewness before preprocessing.

---

## 🛠️ Feature Engineering

### Country Grouping

The dataset contains many country categories. To avoid creating a very high-dimensional one-hot encoded representation, the project keeps the **10 most frequent countries** and groups all remaining countries into:

```text
Other
```

This creates 11 country groups in total.

The resulting feature is:

```text
Grouped_country
```

---

## 🔤 Encoding Strategy

Different categorical variables are handled according to their meaning.

### Ordinal Encoding

`Stress_Level` has a natural order:

```text
Low < Medium < High < Very High
```

Therefore it is encoded using an explicit ordinal order.

### One-Hot Encoding

The following nominal variables are one-hot encoded:

```text
Gender
Academic_Level
Most_Used_Platform
Purpose_Of_Use
Grouped_country
```

This avoids introducing artificial numerical relationships between unrelated categories.

---

## ⚙️ Preprocessing Pipeline

The project uses `ColumnTransformer` with separate preprocessing branches.

### Skewed Feature

```text
Study_Hours
```

Processing:

```text
Log transformation → StandardScaler
```

### Other Numerical Features

```text
Age
Avg_Daily_Usage_Hours
Daily_Unlocks
Physical_Activity_Hours
Sleep_Hours_Per_Night
```

Processing:

```text
StandardScaler
```

### Stress Level

```text
OrdinalEncoder
```

with:

```text
Low → Medium → High → Very High
```

### Nominal Categorical Features

```text
OneHotEncoder(handle_unknown="ignore")
```

The preprocessing is stored together with the model inside a single scikit-learn pipeline.

---

# 🌲 Model Development

Two main regression approaches were compared.

## 1. Linear Regression

Linear Regression was used as the baseline model.

Test results:

| Metric | Score |
|---|---:|
| Training R² | 0.7237 |
| Testing R² | 0.7398 |
| MAE | 0.5362 |
| RMSE | 0.6760 |

---

## 2. Random Forest Regressor

A Random Forest Regressor was then trained using the same preprocessing pipeline.

Default Random Forest results:

| Metric | Score |
|---|---:|
| Training R² | 0.9808 |
| Testing R² | 0.8776 |
| MAE | 0.3472 |
| RMSE | 0.4637 |

The default Random Forest performed better than the Linear Regression baseline on the test set.

---

## 🔎 Hyperparameter Tuning

`RandomizedSearchCV` was used to search for better Random Forest parameters.

The selected parameters were:

```text
n_estimators = 200
max_depth = 15
min_samples_split = 5
min_samples_leaf = 2
```

The tuned model achieved:

| Metric | Score |
|---|---:|
| Testing R² | 0.8650 |
| Training R² | 0.9547 |
| MAE | 0.3689 |
| RMSE | 0.4869 |

Although the tuned model reduced the training score, the notebook's final comparison shows that the **default Random Forest achieved the higher test R²**.

Therefore, the saved model in the project is the default `RandomForestRegressor` pipeline:

```python
joblib.dump(rf_pipeline, "Mental_Health_Model.pkl")
```

---

# 💾 Model Serialization

The complete preprocessing + model pipeline is saved as:

```text
Mental_Health_Model.pkl
```

Saving the complete pipeline means the API can receive raw input data and call:

```python
model.predict(input_row)
```

without manually recreating the training-time preprocessing steps.

---

# 🚀 FastAPI Backend

The backend is implemented using **FastAPI**.

The model is loaded when the application starts:

```python
model = joblib.load(BASE_DIR / "Mental_Health_Model.pkl")
```

The backend also uses:

- Pydantic
- pandas
- joblib
- scikit-learn
- CORS middleware

---

## API Endpoints

### `GET /`

Used as a simple health check.

Example response:

```json
{
  "Welcome to My web"
}
```

### `POST /predict`

Receives student information and returns the predicted mental health score.

Endpoint:

```text
https://mental-health-prediction-score-0r42.onrender.com/predict
```

---

## 📥 Request Example

```json
{
  "Age": 21,
  "Gender": "Male",
  "Country": "India",
  "Academic_Level": "Undergraduate",
  "Most_Used_Platform": "Instagram",
  "Purpose_Of_Use": "Entertainment",
  "Avg_Daily_Usage_Hours": 8,
  "Daily_Unlocks": 50,
  "Study_Hours": 5,
  "Physical_Activity_Hours": 1,
  "Sleep_Hours_Per_Night": 7,
  "Stress_Level": "Medium"
}
```

## 📤 Response Example

```json
{
  "predicted_mental_health_score": 7.42
}
```

The exact prediction depends on the input values and the trained model.

---

# 🛡️ Input Validation

FastAPI/Pydantic validates the incoming request.

Examples of validation rules include:

```text
Age: 10–100
Avg_Daily_Usage_Hours: 6–24
Study_Hours: 0–24
Physical_Activity_Hours: 0–2
Sleep_Hours_Per_Night: 0–24
Daily_Unlocks: >= 0
```

Categorical fields are restricted to the supported values defined by the API schema.

---

# 🌐 Frontend

The frontend is built using:

- HTML5
- CSS3
- Vanilla JavaScript

The UI is branded as:

```text
MindScore AI
Mental Health Prediction
```

The frontend contains sections for:

1. Personal Information
2. Social Media Usage
3. Lifestyle & Wellbeing

The result panel displays the predicted score and a frontend interpretation.

---

## 🔗 Frontend → Backend Communication

The JavaScript frontend stores the deployed API URL:

```javascript
const API_URL =
  "https://mental-health-prediction-score-0r42.onrender.com";
```

When the form is submitted, JavaScript sends a `POST` request to:

```text
/predict
```

with:

```text
Content-Type: application/json
```

The returned prediction is then displayed in the result panel.

---

## 📊 Score Interpretation

The numerical prediction is interpreted on the frontend using these ranges:

| Score | Frontend Label |
|---|---|
| `< 30` | Lower Score Range |
| `30–59.99` | Moderate Score Range |
| `60–79.99` | Good Score Range |
| `>= 80` | Higher Score Range |

These labels are **frontend interpretations** and are not additional model outputs.

---

# ☁️ Deployment

## Frontend — Vercel

The static frontend can be deployed through Vercel.

**Live Project:**

```text
YOUR_VERCEL_LIVE_LINK
```

Replace the placeholder above with your actual Vercel URL.

## Backend — Render

The FastAPI backend is deployed on Render.

**Backend API:**

```text
https://mental-health-prediction-score-0r42.onrender.com
```

---

# 🧪 Running Locally

## 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd ml-fastapi-project
```

## 2. Create a virtual environment

Windows:

```bash
python -m venv venv
venv\Scripts\activate
```

Linux/macOS:

```bash
python3 -m venv venv
source venv/bin/activate
```

## 3. Install dependencies

```bash
pip install -r requirements.txt
```

## 4. Start FastAPI

From the project root:

```bash
uvicorn app.main:app --reload
```

The API will normally be available at:

```text
http://127.0.0.1:8000
```

FastAPI's interactive documentation will be available at:

```text
http://127.0.0.1:8000/docs
```

## 5. Run the frontend

Open:

```text
frontend/index.html
```

in a browser, or serve the frontend through a local static server.

Make sure the JavaScript API URL points to your local backend if you are testing locally:

```javascript
const API_URL = "http://127.0.0.1:8000";
```

---

# 🔄 Application Workflow

```text
User enters information
        ↓
Frontend validates form
        ↓
JavaScript creates JSON request
        ↓
POST /predict
        ↓
FastAPI validates request
        ↓
Input converted to DataFrame
        ↓
Saved ML pipeline preprocesses data
        ↓
Random Forest generates prediction
        ↓
FastAPI returns JSON response
        ↓
Frontend displays predicted score
        ↓
Score is animated and interpreted
```

---

# 🧰 Tech Stack

| Category | Technology |
|---|---|
| Programming | Python, JavaScript |
| Frontend | HTML5, CSS3, JavaScript |
| Backend | FastAPI |
| Data Processing | pandas, NumPy |
| Machine Learning | scikit-learn |
| Model | Random Forest Regressor |
| Model Saving | Joblib |
| Validation | Pydantic |
| API Communication | REST / JSON |
| Frontend Deployment | Vercel |
| Backend Deployment | Render |

---

# 📁 Important Files

### `app/main.py`

Contains the FastAPI application, request validation, model loading, country grouping, prediction endpoint, and response model.

### `app/Mental_Health_Model.pkl`

Contains the saved machine learning pipeline used by the backend.

### `frontend/index.html`

Contains the structure of the MindScore AI interface and prediction form.

### `frontend/scripts.js`

Handles form submission, API communication, API status checking, prediction display, score animation, and form reset functionality.

### `frontend/style.css`

Contains the complete responsive UI styling.

### `requirements.txt`

Contains the Python dependencies required to run the backend.

---

# ⚠️ Disclaimer

This project is an educational machine learning application.

The prediction is generated by a machine-learning model and **should not be considered a medical diagnosis**. The application itself includes a disclaimer recommending professional support for people experiencing mental-health difficulties.

---

# 🎯 Learning Outcomes

This project demonstrates practical experience with:

- Exploratory Data Analysis
- Data cleaning
- Feature engineering
- Handling high-cardinality categorical features
- Ordinal encoding
- One-hot encoding
- Feature scaling
- Log transformation
- `ColumnTransformer`
- scikit-learn `Pipeline`
- Regression
- Linear Regression
- Random Forest
- Hyperparameter tuning
- Cross-validation
- Model evaluation
- Model serialization with Joblib
- FastAPI
- Pydantic validation
- REST API development
- CORS
- Frontend/API integration
- Cloud deployment

---

# 👨‍💻 Author

**Ashish Singh**

Machine Learning / Software Development Project

---

## ⭐ If you found this project useful

Feel free to star the repository and explore the implementation.
