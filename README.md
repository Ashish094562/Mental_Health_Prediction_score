# 🧠 MindScore AI — Mental Health Prediction

A machine learning web application that predicts a student's **mental health score** based on social-media usage, academic habits, lifestyle factors, and stress level.

## 🚀 Live Demo

**Live Project:**  
https://mental-health-prediction-score-oth9xmeky.vercel.app/

**Backend API:**  
https://mental-health-prediction-score-0r42.onrender.com

---

## 📌 About the Project

MindScore AI is a full-stack machine learning project that demonstrates the complete ML workflow:

- Data analysis and cleaning
- Feature engineering
- Data preprocessing
- Model training
- Model evaluation
- Model serialization
- FastAPI API development
- Frontend integration
- Cloud deployment

The project predicts `Mental_Health_Score` as a continuous numerical value, so this is a **regression problem**.

The model uses information such as:

- Age and gender
- Country
- Academic level
- Most-used social media platform
- Purpose of social media usage
- Daily social media usage
- Daily phone/social-media unlocks
- Study hours
- Physical activity
- Sleep hours
- Stress level

---

## ✨ Features

- 🧠 Mental health score prediction
- 📊 Regression-based machine learning model
- 🧹 Data cleaning and preprocessing
- 🔤 Ordinal and one-hot encoding
- ⚙️ Scikit-learn preprocessing pipeline
- 🌲 Random Forest Regressor
- 🔎 Hyperparameter tuning with RandomizedSearchCV
- ⚡ FastAPI REST API
- ✅ Pydantic input validation
- 🌐 CORS support
- 📱 Responsive frontend
- ☁️ Vercel frontend deployment
- ☁️ Render backend deployment

---

## 🏗️ How It Works

```text
User enters information
        ↓
HTML/CSS/JavaScript frontend
        ↓
POST /predict
        ↓
FastAPI validates the input
        ↓
Input converted to DataFrame
        ↓
Saved ML Pipeline preprocesses data
        ↓
Random Forest Regressor
        ↓
Predicted Mental Health Score
        ↓
FastAPI returns JSON
        ↓
Frontend displays the prediction
```

The complete preprocessing pipeline and trained model are saved together in:

```text
Mental_Health_Model.pkl
```

This allows the API to receive raw user data and apply the same preprocessing used during training before generating the prediction.

---

## 🤖 Machine Learning

### Dataset

The project uses:

```text
Student Social Media And Mental Health Impact.csv
```

The dataset contains approximately **5,000 student records**.

Target variable:

```text
Mental_Health_Score
```

### Data Processing

The project performs:

- Missing-value inspection
- Duplicate checking
- Data-type analysis
- Descriptive statistics
- Correlation analysis
- Outlier analysis
- Feature engineering
- Categorical encoding
- Feature scaling

### Feature Engineering

The country feature is grouped into the **10 most frequent countries**, while all remaining countries are grouped as:

```text
Other
```

The resulting feature is:

```text
Grouped_country
```

### Encoding

**Ordinal Encoding**

`Stress_Level` is encoded according to:

```text
Low → Medium → High → Very High
```

**One-Hot Encoding**

Used for:

```text
Gender
Academic_Level
Most_Used_Platform
Purpose_Of_Use
Grouped_country
```

### Preprocessing Pipeline

`ColumnTransformer` is used to apply different preprocessing steps to different features.

For `Study_Hours`:

```text
Log Transformation → StandardScaler
```

Other numerical features use:

```text
StandardScaler
```

The complete preprocessing and model are stored in one scikit-learn pipeline.

---

## 📊 Model Performance

Two regression models were compared.

### Linear Regression

| Metric | Score |
|---|---:|
| Training R² | 0.7237 |
| Testing R² | 0.7398 |
| MAE | 0.5362 |
| RMSE | 0.6760 |

### Random Forest Regressor

The default Random Forest performed better than the Linear Regression baseline.

| Metric | Score |
|---|---:|
| Training R² | 0.9808 |
| Testing R² | 0.8776 |
| MAE | 0.3472 |
| RMSE | 0.4637 |

### Tuned Random Forest

`RandomizedSearchCV` was used for hyperparameter tuning.

Selected parameters:

```text
n_estimators = 200
max_depth = 15
min_samples_split = 5
min_samples_leaf = 2
```

Results:

| Metric | Score |
|---|---:|
| Training R² | 0.9547 |
| Testing R² | 0.8650 |
| MAE | 0.3689 |
| RMSE | 0.4869 |

The **default Random Forest achieved the highest testing R² (0.8776)**, so the default Random Forest pipeline was selected as the final model.

---

## 🌐 API

The backend is built using **FastAPI**.

### Health Check

```http
GET /
```

### Prediction

```http
POST /predict
```

Live API:

```text
https://mental-health-prediction-score-0r42.onrender.com/predict
```

### Example Request

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

### Example Response

```json
{
  "predicted_mental_health_score": 7.42
}
```

---

## 📁 Project Structure

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
└── README.md
```

> Make sure the JavaScript filename referenced by `index.html` matches the actual filename in the `frontend` folder.

---

## 🛠️ Technologies Used

| Category | Technologies |
|---|---|
| Programming | Python, JavaScript |
| Frontend | HTML5, CSS3, JavaScript |
| Backend | FastAPI |
| Data Processing | Pandas, NumPy |
| Machine Learning | Scikit-learn |
| Model | Random Forest Regressor |
| Model Saving | Joblib |
| Validation | Pydantic |
| API | REST / JSON |
| Frontend Deployment | Vercel |
| Backend Deployment | Render |

---

## ☁️ Deployment

### Frontend

The frontend is deployed using **Vercel**.

```text
https://mental-health-prediction-score-oth9xmeky.vercel.app/
```

### Backend

The FastAPI backend is deployed using **Render**.

```text
https://mental-health-prediction-score-0r42.onrender.com
```

The frontend communicates with the backend through the `/predict` API endpoint.

---

## 💻 Run Locally

### 1. Clone the Repository

```bash
git clone Ashish094562/Mental_Health_score
cd ml-fastapi-project
```

### 2. Create a Virtual Environment

**Windows:**

```bash
python -m venv venv
venv\Scripts\activate
```

**Linux/macOS:**

```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Start the FastAPI Backend

From the project root:

```bash
uvicorn app.main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

Swagger API documentation:

```text
http://127.0.0.1:8000/docs
```

### 5. Run the Frontend

Open:

```text
frontend/index.html
```

in your browser or use a local static server.

For local testing, make sure the frontend API URL points to:

```javascript
const API_URL = "http://127.0.0.1:8000";
```

---

## 🔄 Application Architecture

```text
                 ┌──────────────────┐
                 │      User        │
                 └────────┬─────────┘
                          ↓
                 ┌──────────────────┐
                 │ HTML / CSS / JS  │
                 │    Frontend      │
                 └────────┬─────────┘
                          ↓
                    POST /predict
                          ↓
                 ┌──────────────────┐
                 │     FastAPI      │
                 │     Backend      │
                 └────────┬─────────┘
                          ↓
                 ┌──────────────────┐
                 │ ML Preprocessing │
                 │    Pipeline      │
                 └────────┬─────────┘
                          ↓
                 ┌──────────────────┐
                 │ Random Forest    │
                 │    Regressor     │
                 └────────┬─────────┘
                          ↓
                 ┌──────────────────┐
                 │ Mental Health    │
                 │     Score        │
                 └──────────────────┘
```

---

## 📚 What I Learned

This project helped me practice:

- Exploratory Data Analysis
- Data cleaning
- Feature engineering
- Handling categorical features
- Ordinal encoding
- One-hot encoding
- Feature scaling
- Log transformation
- ColumnTransformer
- Scikit-learn Pipeline
- Regression
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

## 👨‍💻 Author

**Ashish Singh**

Machine Learning / Software Development Project

---

⭐ If you found this project useful, consider giving the repository a star.
