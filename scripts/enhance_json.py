#!/usr/bin/env python3
import json
import urllib.parse

def enhance_json_with_meanings_and_links():
    # Load the existing JSON file
    with open('stem_words.json', 'r') as file:
        data = json.load(file)
    
    # Dictionary of example words and their meanings
    # This is a simplified approach - in a real implementation, you might use a dictionary API
    word_meanings = {
        # List 1
        "antedate": "to precede in time; to date earlier than the actual date",
        "antecedent": "something that comes before; a preceding event or circumstance",
        "antebellum": "existing before a war, especially before the American Civil War",
        "anterior": "situated before or toward the front",
        "ante meridiem": "before noon (AM)",
        "antepenult": "third from the end",
        
        "antiaircraft": "designed to attack or defend against aircraft",
        "antibody": "a protein produced by the immune system that combats a specific antigen",
        "anticlimax": "a disappointing end to something anticipated with excitement",
        "anticline": "a fold in rock layers where the layers slope downward from the crest",
        "antitoxin": "a substance that counteracts a toxin",
        "antithesis": "the direct opposite",
        
        # Adding more examples for other stems would follow the same pattern
        # For brevity, I'm only including a few examples
    }
    
    # Default meaning when specific meaning is not available
    default_meaning = "Click the link to see the definition"
    
    # Enhance each stem's examples with meanings and links
    for stem_entry in data["stems"]:
        enhanced_examples = []
        for example in stem_entry["examples"]:
            # Create Google search link
            search_query = f"define+{example}"
            google_link = f"https://www.google.com/search?q={search_query}"
            
            # Get meaning (use default if not in our dictionary)
            meaning = word_meanings.get(example, default_meaning)
            
            # Add to enhanced examples
            enhanced_examples.append({
                "word": example,
                "meaning": meaning,
                "search_link": google_link
            })
        
        # Replace the simple examples list with the enhanced one
        stem_entry["examples"] = enhanced_examples
    
    # Write the enhanced data back to a new JSON file
    with open('enhanced_stem_words.json', 'w') as file:
        json.dump(data, file, indent=2)
    
    print(f"Enhanced JSON file created with meanings and search links for {len(data['stems'])} stems.")

if __name__ == "__main__":
    enhance_json_with_meanings_and_links()
