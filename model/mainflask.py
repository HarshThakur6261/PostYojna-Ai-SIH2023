from flask import Flask, request, jsonify, render_template
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler, OneHotEncoder
from tensorflow.keras.models import Sequential, Model
from tensorflow.keras.layers import Dense, Dropout, Input, Concatenate
import tensorflow as tf
import os
from flask_cors import CORS
# Disable oneDNN log messages
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

# Initialize Flask app
app = Flask(__name__)
CORS(app) 
# Data Initialization
location_df = pd.DataFrame({
    'location': ['Theni', 'Chennai', 'Thiruvallur', 'Coimbatore', 'Ariyalur'],
    'population_density': [21000, 11000, 8400, 7100, 6900],
    'gender_ratio': [0.92, 0.87, 0.95, 0.98, 0.89],
    'income_level': [45000, 52000, 48000, 38000, 35000],
    'farming_cycle': ['Kharif', 'Rabi', 'Mixed', 'Kharif', 'Mixed'],
    'seasonal_pattern': ['Monsoon', 'Winter', 'Year-round', 'Monsoon', 'Year-round']
})
scheme_df = pd.DataFrame({
    'scheme': ['Sukanya Samriddhi Yojana', 'Senior citizen saving schemes', 'Kisan Vikas Patra', 'Post office saving account', 'Monthly income scheme'],
    'ROI': [12.5, 8.2, 15.3, 10.1, 9.8],
    'target_gender': ['Both', 'Male', 'Both', 'Female', 'Both'],
    'target_age_group': ['Adult', 'Young', 'Adult', 'Senior', 'Young'],
    'tax_benefit': ['Yes', 'No', 'Yes', 'No', 'Yes'],
    'risk_level': ['Low', 'Medium', 'High', 'Low', 'Medium']
})
user_feedback_df = pd.DataFrame({
    'user_id': [1, 2, 3, 4, 5],
    'location': ['Theni', 'Chennai', 'Thiruvallur', 'Coimbatore', 'Ariyalur'],
    'scheme':  ['Sukanya Samriddhi Yojana', 'Senior citizen saving schemes', 'Kisan Vikas Patra', 'Post office saving account', 'Monthly income scheme'],
    'rating': [4.5, 3.8, 4.2, 3.9, 4.0]
})

# Data Preprocessing
scaler = MinMaxScaler()
location_df[['population_density', 'income_level']] = scaler.fit_transform(
    location_df[['population_density', 'income_level']]
)

encoder = OneHotEncoder(sparse_output=False)
location_encoder = OneHotEncoder(sparse_output=False)
location_cat_encoded = location_encoder.fit_transform(location_df[['farming_cycle', 'seasonal_pattern']])
location_cat_cols = location_encoder.get_feature_names_out(['farming_cycle', 'seasonal_pattern'])
location_encoded_df = pd.DataFrame(location_cat_encoded, columns=location_cat_cols)

scheme_encoder = OneHotEncoder(sparse_output=False)
scheme_cat_encoded = scheme_encoder.fit_transform(scheme_df[['target_gender', 'target_age_group', 'tax_benefit', 'risk_level']])
scheme_cat_cols = scheme_encoder.get_feature_names_out(['target_gender', 'target_age_group', 'tax_benefit', 'risk_level'])
scheme_encoded_df = pd.DataFrame(scheme_cat_encoded, columns=scheme_cat_cols)

location_features = pd.concat([
    location_df[['population_density', 'gender_ratio', 'income_level']],
    location_encoded_df
], axis=1)

scheme_features = pd.concat([
    scheme_df[['ROI']],
    scheme_encoded_df
], axis=1)

# Function to create Autoencoder
def create_autoencoder(input_dim):
    inputs = Input(shape=(input_dim,))
    x = Dense(32, activation='relu')(inputs)
    x = Dropout(0.2)(x)
    x = Dense(16, activation='relu')(x)
    x = Dropout(0.2)(x)
    x = Dense(8, activation='relu')(x)
    x = Dense(16, activation='relu')(x)
    x = Dense(32, activation='relu')(x)
    outputs = Dense(input_dim, activation='sigmoid')(x)
    model = Model(inputs, outputs)
    model.compile(optimizer='adam', loss='mse')
    return model

location_autoencoder = create_autoencoder(location_features.shape[1])
location_autoencoder.fit(location_features, location_features, epochs=10, batch_size=2, verbose=0)

scheme_autoencoder = create_autoencoder(scheme_features.shape[1])
scheme_autoencoder.fit(scheme_features, scheme_features, epochs=10, batch_size=2, verbose=0)

# Recommendation Model
def create_recommendation_model(location_dim, scheme_dim):
    location_input = Input(shape=(location_dim,))
    scheme_input = Input(shape=(scheme_dim,))

    x1 = Dense(16, activation='relu')(location_input)
    x2 = Dense(16, activation='relu')(scheme_input)

    concat = Concatenate()([x1, x2])
    x = Dense(32, activation='relu')(concat)
    x = Dropout(0.2)(x)
    x = Dense(16, activation='relu')(x)
    x = Dense(8, activation='relu')(x)
    output = Dense(1, activation='sigmoid')(x)

    model = Model(inputs=[location_input, scheme_input], outputs=output)
    model.compile(optimizer='adam', loss='mse')
    return model

X_loc = location_features.values
X_scheme = scheme_features.values
y = user_feedback_df['rating'].values / 5.0

recommendation_model = create_recommendation_model(X_loc.shape[1], X_scheme.shape[1])
recommendation_model.fit([X_loc, X_scheme], y, epochs=10, batch_size=2, verbose=0)

# Flask Routes
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        data = request.json
        user_id = data.get('userId')
        location = data.get('location')
        
        if not location or location not in location_df['location'].values:
            return jsonify({
                "status": "error",
                "message": "Invalid location. Please choose from: " + ", ".join(location_df['location'].values)
            }), 400
                
        loc_idx = location_df.index[location_df['location'] == location].tolist()[0]
        loc_features = location_features.iloc[loc_idx:loc_idx+1].values
        loc_repeated = np.tile(loc_features, (len(scheme_features), 1))
        
        predictions = recommendation_model.predict([loc_repeated, scheme_features.values], verbose=0)
        
        recommendations = [{
            "scheme": scheme,
            "score": float(score),
            "details": {
                "ROI": float(scheme_df[scheme_df['scheme'] == scheme]['ROI'].values[0]),
                "target_gender": scheme_df[scheme_df['scheme'] == scheme]['target_gender'].values[0],
                "risk_level": scheme_df[scheme_df['scheme'] == scheme]['risk_level'].values[0]
            }
        } for scheme, score in zip(scheme_df['scheme'], predictions.flatten())]
        
        recommendations.sort(key=lambda x: x['score'], reverse=True)
        
        return jsonify({
            "status": "success",
            "data": {
                "location": location,
                "userId": user_id,
                "recommendations": recommendations[:3]  # Return top 3 recommendations
            }
        })
    
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True)
