#!/usr/bin/env python3
import json

def reorganize_by_lists():
    # Load the existing enhanced JSON file
    with open('enhanced_stem_words.json', 'r') as file:
        data = json.load(file)
    
    # Get all stems
    all_stems = data["stems"]
    
    # Find the maximum list number to determine how many lists we need
    max_list_num = max(stem["list"] for stem in all_stems)
    
    # Create a new structure organized by lists
    reorganized_data = {
        "lists": []
    }
    
    # Populate the lists
    for list_num in range(1, max_list_num + 1):
        list_stems = [stem.copy() for stem in all_stems if stem["list"] == list_num]
        
        # Create the list entry
        list_entry = {
            "list_number": list_num,
            "stems": list_stems
        }
        
        # Remove the list number from each stem since it's now redundant
        for stem in list_entry["stems"]:
            del stem["list"]
        
        # Add this list to our reorganized data
        reorganized_data["lists"].append(list_entry)
    
    # Write the reorganized data to a new JSON file
    with open('reorganized_stem_words.json', 'w') as file:
        json.dump(reorganized_data, file, indent=2)
    
    print(f"Reorganized JSON file created with {len(reorganized_data['lists'])} lists.")

if __name__ == "__main__":
    reorganize_by_lists()
