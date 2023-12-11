from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer

# Create a ChatBot instance
medical_chatbot = ChatBot('MedicalBot')

# Create a new trainer for the chatbot
trainer = ChatterBotCorpusTrainer(medical_chatbot)

# Train the chatbot on medical-related data
trainer.train('chatterbot.corpus.english.medical')

# Function to get responses from the chatbot
def get_medical_response(user_input):
    response = medical_chatbot.get_response(user_input)
    return str(response)

# Interaction loop
while True:
    user_input = input("You: ")
    
    if user_input.lower() == 'exit':
        break

    response = get_medical_response(user_input)
    print("MedicalBot:", response)
