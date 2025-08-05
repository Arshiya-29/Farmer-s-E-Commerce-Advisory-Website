import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import pickle

# 1. Load dataset
data = pd.read_csv("Crop_recommendation.csv")

# 2. Split features and target
X = data.drop("label", axis=1)
y = data["label"]

# 3. Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 4. Train Random Forest model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 5. Evaluate model
accuracy = model.score(X_test, y_test)
print(f"Model Accuracy: {accuracy * 100:.2f}%")

# 6. Save the model
with open("crop_model.pkl", "wb") as f:
    pickle.dump(model, f)

# 7. Predict for a sample input
sample = [[90, 40, 43, 20.5, 82.3, 6.5, 202.5]]  # Example values
prediction = model.predict(sample)
print("Recommended Crop:", prediction[0])
