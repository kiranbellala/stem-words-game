#!/usr/bin/env python3
import json
import urllib.parse

def enhance_json_with_meanings_and_links():
    # Load the existing JSON file
    with open('stem_words.json', 'r') as file:
        data = json.load(file)
    
    # Enhance each stem's examples with meanings and links
    for stem_entry in data["stems"]:
        enhanced_examples = []
        for example in stem_entry["examples"]:
            # Create properly URL-encoded Google search link
            search_query = urllib.parse.quote(f"define {example}")
            google_link = f"https://www.google.com/search?q={search_query}"
            
            # For this version, we'll use a placeholder meaning that encourages using the search link
            # In a production version, you might integrate with a dictionary API
            meaning = "Click the link to see the definition"
            
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
