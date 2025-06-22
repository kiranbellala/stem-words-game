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
        
        "bilateral": "having or relating to two sides",
        "bicycle": "a vehicle with two wheels, pedals, and a seat",
        "binary": "relating to a system of numbers that has 2 as its base",
        "bimonthly": "occurring every two months or twice a month",
        "biped": "an animal that uses two legs for walking",
        "bipolar": "having two poles or extremes",
        "binocular": "relating to both eyes; using both eyes at once",
        "bicuspid": "having two points or cusps",
        
        "circumnavigate": "to sail or fly around something, especially the world",
        "circumspect": "careful to consider all circumstances and possible consequences",
        "circumvent": "to find a way around an obstacle or difficulty",
        "circumlocution": "the use of many words where fewer would do",
        "circus": "a traveling company of performers",
        
        "combination": "a joining or merging of different parts or qualities",
        "comfort": "a state of physical ease and freedom from pain or constraint",
        "commensurate": "corresponding in size or degree; in proportion",
        "common": "occurring, found, or done often; prevalent",
        "complete": "having all the necessary or appropriate parts",
        "combo": "a small jazz or dance band; a combination",
        
        "contract": "a written or spoken agreement intended to be enforceable by law",
        "confidence": "the feeling or belief that one can rely on someone or something",
        "confine": "to keep or restrict someone or something within certain limits",
        "confederate": "joined by an agreement or treaty",
        "conjunction": "the action or instance of two or more events occurring at the same point in time",
        "contact": "the state of physical touching or being in touch",
        
        "deposit": "a sum of money placed or kept in a bank account",
        "descent": "an act of moving downward, dropping, or falling",
        "despicable": "deserving hatred and contempt",
        "denounce": "publicly declare to be wrong or evil",
        "deduct": "subtract or take away (an amount or part) from a total",
        "demolish": "pull or knock down (a building)",
        "decrepit": "worn out or ruined because of age or neglect",
        "deplete": "use up the supply or resources of",
        
        # More definitions can be added here
    }
    
    # Default meaning when specific meaning is not available
    default_meaning = "Click the link to see the definition"
    
    # Enhance each stem's examples with meanings and links
    for stem_entry in data["stems"]:
        enhanced_examples = []
        for example in stem_entry["examples"]:
            # Create properly URL-encoded Google search link
            search_query = urllib.parse.quote(f"define {example}")
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
