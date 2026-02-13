const fs = require('fs');
const path = require('path');

// 1. Define Major Polychrests (Detailed) - ~50-60 items
const majorRemedies = {
    "Aconite Napellus": {
        "Common Name": "Monkshood",
        "Keynotes": "Suddenness, Fear of Death, Restlessness, Dry Heat",
        "Mind": "Great fear and anxiety. Fears death, predicts the day. Restless.",
        "Generals": "Sudden onset of complaints. Exposure to dry, cold wind.",
        "Relationship": "Comp: Sulphur."
    },
    "Allium Cepa": {
        "Common Name": "Red Onion",
        "Keynotes": "Acrid Nasal Discharge, Bland Tears",
        "Nose": "Profuse watery acrid discharge. Sneezing.",
        "Eyes": "Burning, smarting, bland lachrymation.",
        "Relationship": "Comp: Phos, Thuja."
    },
    "Antimonium Tartaricum": { "Keynotes": "Rattling Mucus, Drowsiness, Thirstless", "Resp": "Great rattling of mucus but cannot expectorate." },
    "Apis Mellifica": { "Keynotes": "Stinging Pains, Thirstless, Edema", "General": "Bag-like swelling under eyes. Intolerance of heat." },
    "Argentum Nitricum": { "Keynotes": "Anticipatory Anxiety, Craves Sweets, Splinter Pains", "Mind": "Hurried. Fear of heights/bridges." },
    "Arnica Montana": { "Keynotes": "Trauma, Sore/Bruised Feeling, Says 'I am well'", "Trauma": "First remedy for injury/shock." },
    "Arsenicum Album": { "Keynotes": "Restlessness, Anxiety, Burning > Heat, < Midnight", "Mind": "Fastidious. Fear of death/disease." },
    "Aurum Metallicum": { "Keynotes": "Depression, Suicidal, Bone Pains", "Mind": "Loathing of life. Relief when thinking of death." },
    "Baryta Carbonica": { "Keynotes": "Delayed Development, Swollen Glands, Bashful", "Mind": "Childish. Memory loss." },
    "Belladonna": { "Keynotes": "Sudden Violent Inflammation, Heat, Redness, Throbbing", "Head": "Throbbing headache. Dilated pupils." },
    "Bryonia Alba": { "Keynotes": "< Motion, > Pressure/Rest, Dryness", "General": "Stitching pains. Thirst for large amounts." },
    "Calcarea Carbonica": { "Keynotes": "Cold/Clammy, Craves Eggs/Chalk, Obese/Flabby", "General": "Sweat on head. Delayed fontanelles." },
    "Calcarea Phosphorica": { "Keynotes": "Growing Pains, Dissatisfied, Bone Issues", "General": "School headaches. Non-union of fractures." },
    "Calendula Officinalis": { "Keynotes": "Wound Healing, Prevents Pus", "Skin": "Promotes granulation. Lacerated wounds." },
    "Cantharis": { "Keynotes": "Burning Violent Pains, UTI", "Urine": "Intolerable urging. Burning/cutting pain." },
    "Carbo Vegetabilis": { "Keynotes": "Air Hunger, Collapse, Indigestion", "General": "Wants to be fanned. Cold but wants air." },
    "Causticum": { "Keynotes": "Paralysis, Burns, Sympathetic", "General": "Burn scars. Warts. Urine retention." },
    "Chamomilla": { "Keynotes": "Irritable, Oversensitive, Capricious", "Mind": "Child wants to be carried. Angry snapping." },
    "China Officinalis": { "Keynotes": "Fluid Loss, Periodicity, Gas", "General": "Debility from loss of fluids. Ringing in ears." },
    "Cina": { "Keynotes": "Worms, Picking Nose, Irritable", "General": "Grinding teeth. White ring around mouth." },
    "Cocculus Indicus": { "Keynotes": "Motion Sickness, Care-taking Fatigue", "General": "Nausea from riding in cars/boats." },
    "Coffea Cruda": { "Keynotes": "Mental Excitability, Insomnia", "Mind": "Joyous tone. Senses acute." },
    "Colocynthis": { "Keynotes": "Cramping Colic > Bending Double", "Abdomen": "Agonizing pain > hard pressure." },
    "Conium Maculatum": { "Keynotes": "Glandular Induration, Ascending Paralysis", "General": "Vertigo turning in bed." },
    "Drosera": { "Keynotes": "Barking Cough, Whooping Cough", "Resp": "Cough < lying down at night." },
    "Dulcamara": { "Keynotes": "Damp Cold Aggravates", "General": "Skin eruptions. Joint pains in wet weather." },
    "Eupatorium Perfoliatum": { "Keynotes": "Bone Breaking Pains", "Fever": "Influenza with deep bone aches." },
    "Euphrasia": { "Keynotes": "Acrid Tears, Bland Nasal Discharge", "Eyes": "Conjunctivitis. Watering eyes." },
    "Ferrum Metallicum": { "Keynotes": "False Plethora, Flushing", "General": "Weakness but > walking slowly." },
    "Gelsemium": { "Keynotes": "Dull, Dizzy, Drowsy, Trembling", "Mind": "Anticipatory anxiety (stage fright)." },
    "Glonoinum": { "Keynotes": "Sunstroke, Bursting Headache", "Head": "Great throbbing. Cannot bear heat on head." },
    "Graphites": { "Keynotes": "Sticky Honey Discharge, Obesity", "Skin": "Cracks behind ears. Keloids." },
    "Hamamelis": { "Keynotes": "Venous Congestion, Bruised Soreness", "General": "Varicose veins. Hemorrhoids." },
    "Hepar Sulphuris": { "Keynotes": "Oversensitive, Splinter Pains, Pus", "General": "Chilly. Angriest remedy." },
    "Hypericum": { "Keynotes": "Nerve Injury, Crushed Fingers", "General": "Injury to nerve rich areas (fingers/toes)." },
    "Ignatia Amara": { "Keynotes": "Grief, Hysteria, Sighing", "Mind": "Changeable mood. Lump in throat." },
    "Ipecacuanha": { "Keynotes": "Clean Tongue, Constant Nausea", "Stomach": "Vomiting does not relieve." },
    "Kali Bichromicum": { "Keynotes": "Stringy Discharge, Wandering Pains", "General": "Round punched out ulcers." },
    "Kali Carbonicum": { "Keynotes": "Backache, Swollen Eyelids, < 3 AM", "Resp": "Asthma > leaning forward." },
    "Kali Phosphoricum": { "Keynotes": "Brain Fag, Nervous Exhaustion", "Mind": "Mental fatigue. Foul breath." },
    "Lachesis": { "Keynotes": "Left Sided, Loquacity, Jealousy", "General": "Cannot bear tight clothes. < after sleep." },
    "Ledum Palustre": { "Keynotes": "Puncture Wounds, Coldness > Cold", "General": "Bites, stings. Rheumatism ascends." },
    "Lycopodium": { "Keynotes": "Right Sided, Gas, Lack of Confidence", "Stomach": "Full after few bites. Craves sweets." },
    "Magnesia Phosphorica": { "Keynotes": "Cramps > Heat/Pressure", "General": "Neuralgia. Menstrual cramps." },
    "Medorrhinum": { "Keynotes": "Hurry, > Seaside, Sycosis", "Mind": "Weeps when telling symptoms." },
    "Mercurius Solubilis": { "Keynotes": "Syphilitic, Salivation, < Night", "Mouth": "Imprinted tongue. Metallic taste." },
    "Natrum Muriaticum": { "Keynotes": "Grief, Craves Salt, Dryness", "Mind": "Worse consolation. Hammering headache." },
    "Natrum Sulphuricum": { "Keynotes": "Head Injury, Dampness, Diarrhea", "Mind": "Suicidal but restrains. < Morning." },
    "Nitricum Acidum": { "Keynotes": "Splinter Pains, Cracks, Offensive Urine", "General": "Warts. Fissures." },
    "Nux Vomica": { "Keynotes": "Irritable, Chilly, Stimulants", "Stomach": "Wants to vomit but can't. < Morning." },
    "Phosphorus": { "Keynotes": "Burning, Bleeding, Fearful", "General": "Craves cold drinks. Tall/slender." },
    "Phytolacca": { "Keynotes": "Glands, Hardness, Dark Red Throat", "General": "Mastitis. Pain shoots to ear." },
    "Platina": { "Keynotes": "Haughty, Numbness, Sexual", "Mind": "Others look small. Vaginismus." },
    "Podophyllum": { "Keynotes": "Profuse Morning Diarrhea", "General": "Gurgling abdomen. Liver issues." },
    "Psorinum": { "Keynotes": "Filthy Smell, Despair, Cold", "General": "Wearms cap. < Cold." },
    "Pulsatilla": { "Keynotes": "Mild, Weepy, Thirstless, > Open Air", "General": "Changing symptoms. Fat food disagrees." },
    "Pyrogenium": { "Keynotes": "Septic States, Disparity Pulse/Temp", "General": "Bed feels too hard. Offensive." },
    "Rhus Toxicodendron": { "Keynotes": "Restless, > Continued Motion", "General": "Joint stiffness. < Damp cold." },
    "Rumex Crispus": { "Keynotes": "Tickling Cough from Cold Air", "Resp": "Covers mouth to keep air warm." },
    "Ruta Graveolens": { "Keynotes": "Bruised Bones, Eye Strain", "General": "Periosteum injury. Wrist cysts." },
    "Sepia": { "Keynotes": "Indifference, Stasis, Bearing Down", "Female": "Prolapse sensation. > Violent motion." },
    "Silicea": { "Keynotes": "Lack of Grit, Suppuration, Chill", "General": "Sweaty feet. Keloids. Splinters." },
    "Spongia Tosta": { "Keynotes": "Dry Barking Cough (Seal)", "Resp": "Croup. Sawing respiration." },
    "Staphysagria": { "Keynotes": "Suppressed Anger, Surgical Cuts", "General": "Honeymoon cystitis. Sensitive." },
    "Stramonium": { "Keynotes": "Violent Mania, Fear of Dark/Water", "Mind": "Praying/cursing. Night terrors." },
    "Sulphur": { "Keynotes": "Heat, Burning, Itching, messy", "General": "Red orifices. < Bathing. 11am hunger." },
    "Symphytum": { "Keynotes": "Bone Knitting, Eye Injury", "General": "Fractures. Blunt trauma to eye." },
    "Syphilinum": { "Keynotes": "< Night, Ulceration, Bone Pain", "General": "Alcohol craving. Washing mania." },
    "Thuja Occidentalis": { "Keynotes": "Warts, Vaccinosis, Fixed Ideas", "General": "Fleshy growths. Left sided." },
    "Tuberculinum": { "Keynotes": "Wasting, Travel Desire, Fear Dogs", "Resp": "Family history of TB." },
    "Urtica Urens": { "Keynotes": "Hives, Burns, Gout", "Skin": "Stinging, burning, itching." },
    "Veratrum Album": { "Keynotes": "Collapse, Cold Sweat, Vomiting", "General": "Religious mania. Craves ice." },
    "Zincum Metallicum": { "Keynotes": "Restless Legs, Fag", "General": "Fidgety feet. Brain exhastion." }
};

// 2. Helper lists to generate minor remedies
const minorRemediesList = [
    "Abies Canadensis", "Abies Nigra", "Abrotanum", "Absinthium", "Acalypha Indica", "Aceticum Acidum", "Actaea Spicata", "Adonis Vernalis", "Adrenalinum", "Aesculus Glabra",
    "Aethusa Cynapium", "Agaricus Muscarius", "Agnus Castus", "Agraphis Nutans", "Ailanthus Glandulosa", "Aletris Farinosa", "Alfalfa", "Alumen", "Alumina", "Ambra Grisea",
    "Ambrosia", "Ammoniacum", "Ammonium Benzoicum", "Ammonium Bromatum", "Ammonium Carb", "Ammonium Causticum", "Ammonium Iodatum", "Ammonium Mur", "Ammonium Phos", "Ammonium Valer",
    "Amyl Nitrosum", "Anacardium Orientale", "Anagallis", "Anatherum", "Angustura", "Anthracinum", "Antimonium Arsenicogram", "Antimonium Crudum", "Antimonium Iodatum", "Antimonium Sulph",
    "Apocynum Cannabinum", "Aralia Racemosa", "Aranea Diadema", "Argentum Metallicum", "Aristolochia", "Arsenicum Bromatum", "Arsenicum Hydrogenisatum", "Arsenicum Iodatum", "Arsenicum Sulph", "Artemisia Vulgaris",
    "Arum Triphyllum", "Arundo", "Asafoetida", "Asarum Europaeum", "Asclepias Tuberosa", "Asparagus", "Asterias Rubens", "Atropine", "Aurum Arsenicogram", "Aurum Iodatum", "Aurum Muriaticum",
    "Avena Sativa", "Bacillinum", "Badiaga", "Baptisia Tinctoria", "Baryta Acetica", "Baryta Iodata", "Baryta Muriatica", "Bellis Perennis", "Benzinum", "Benzoic Acid", "Berberis Aquifolium",
    "Berberis Vulgaris", "Bismuthum", "Blatta Orientalis", "Borax", "Bothrops", "Bovista", "Bromium", "Bufo Rana", "Cactus Grandiflorus", "Cadmium Sulphuratum", "Caladium Seguinum",
    "Calcarea Acetica", "Calcarea Arsenicosa", "Calcarea Fluorica", "Calcarea Iodata", "Calcarea Silicata", "Calcarea Sulphurica", "Calendula", "Camphora", "Cannabis Indica", "Cannabis Sativa",
    "Capsicum", "Carbo Animalis", "Carbolic Acid", "Carduus Marianus", "Castor Equi", "Caulophyllum", "Ceanothus", "Cedron", "Cenchris", "Cereus Bonplandii", "Chelidonium Majus",
    "Chenopodium", "Chimaphila Umbellata", "Chininum Arsenicosum", "Chininum Sulphuricum", "Chionanthus", "Chloralum", "Chloroformum", "Cholesterinum", "Chromium", "Cicuta Virosa",
    "Cimicifuga", "Cinnabaris", "Cistus Canadensis", "Citrus Vulgaris", "Clematis Erecta", "Cobaltum", "Coca", "Coccus Cacti", "Coffea Tosta", "Colchicum", "Collinsonia",
    "Comocladia", "Condurango", "Convallaria", "Copaiva", "Corallium Rubrum", "Cornus Circinata", "Crataegus", "Crocus Sativus", "Crotalus Cascadella", "Crotalus Horridus",
    "Croton Tiglium", "Cubeba", "Cundurango", "Cuprum Acetate", "Cuprum Arsenicosum", "Cuprum Metallicum", "Cyclamen", "Cypripedium", "Daphne Indica", "Digitalis",
    "Dioscorea", "Diphtherinum", "Dolichos", "Doryphora", "Duboisia", "Elaps Corallinus", "Elaterium", "Equisetum", "Erigeron", "Eryngium", "Eucalyptus", "Eugenia Jambos",
    "Euonymus", "Eupatorium Purpureum", "Euphorbia", "Euphorbium", "Fagopyrum", "Fel Tauri", "Ferrum Arsenicosum", "Ferrum Iodatum", "Ferrum Muriaticum", "Ferrum Phosphoricum",
    "Ferrum Picricum", "Filix Mas", "Fluoric Acid", "Formic Acid", "Formica Rufa", "Fraxinus Americana", "Fucus Vesiculosus", "Gambogia", "Gaultheria", "Gentiana",
    "Geranium", "Ginseng", "Gnaphalium", "Gossypium", "Granatum", "Graphites", "Gratiola", "Grindelia", "Guaiacum", "Guarana", "Guarea", "Gymnocladus",
    "Haematoxylon", "Hekla Lava", "Helleborus", "Helonias", "Hydrastis", "Hydrocotyle", "Hydrocyanic Acid", "Hydrophobinum", "Hyoscyamus", "Iberis", "Ichthyolum",
    "Ignatia", "Illicium", "Indigo", "Indium", "Inula", "Iodum", "Ipecac", "Iris Tenax", "Iris Versicolor", "Jaborandi", "Jacaranda", "Jalapa",
    "Jatropha", "Juglans Cinerea", "Juglans Regia", "Justicia Adhatoda", "Kali Arsenicosum", "Kali Bromatum", "Kali Chloricum", "Kali Cyanatum", "Kali Iodatum", "Kali Muriaticum",
    "Kali Nitricum", "Kali Pemanganicum", "Kali Silicatum", "Kali Sulphuricum", "Kalmia Latifolia", "Kaolin", "Kobaltum", "Kola", "Kousso", "Kreosotum", "Lac Caninum",
    "Lac Defloratum", "Lac Felinum", "Lac Vaccinum", "Lachnanthes", "Lactic Acid", "Lactuca Virosa", "Lapis Albus", "Lathyrus", "Latrodectus Mactans", "Laurocerasus",
    "Lecithin", "Lemna Minor", "Leonurus", "Lepidium", "Leptandra", "Liatris", "Lilium Tigrinum", "Limulus", "Linaria", "Linum", "Lithium Carbonicum",
    "Lobelia Inflata", "Lolium Temulentum", "Lonicera", "Lupulus", "Lycopus", "Lyssin", "Magnesia Carbonica", "Magnesia Muriatica", "Magnesia Sulphurica", "Magnolia",
    "Malandrinum", "Mancinella", "Manganum", "Medusa", "Melilotus", "Menyanthes", "Mephitis", "Mercurius Corrosivus", "Mercurius Cyanatus", "Mercurius Dulcis",
    "Mercurius Iodatus Flavus", "Mercurius Iodatus Ruber", "Mercurius Sulphuricus", "Mezereum", "Millefolium", "Mitchella", "Morphinum", "Moschus", "Murex", "Muriatic Acid",
    "Mygale", "Myrica", "Myristica", "Naja Tripudians", "Naphthalinum", "Narcissus", "Natrum Arsenicosum", "Natrum Carbonicum", "Natrum Phosphoricum", "Natrum Salicylicum",
    "Niccolum", "Nuphar Luteum", "Nux Moschata", "Ocimum Canum", "Oenanthe Crocata", "Oleander", "Oleum Animale", "Oleum Jecoris", "Onosmodium", "Opium",
    "Origanum", "Ornithogalum", "Osmium", "Ostrya", "Ova Tosta", "Oxalic Acid", "Oxytropis", "Paeonia", "Palladium", "Pareira Brava",
    "Paris Quadrifolia", "Passiflora", "Paullinia", "_Petroleum", "Petroselinum", "Phellandrium", "Phosphoric Acid", "Physostigma", "Picric Acid", "Pilocarpus", "Pinus Sylvestris",
    "Piper Methysticum", "Pix Liquida", "Plantago", "Plumbum Metallicum", "Polygonum", "Populus Candicans", "Populus Tremuloides", "Pothos", "Prunus Spinosa", "Pielea",
    "Pulex", "Pulsatilla Nuttalliana", "Radium Bromatum", "Ranunculus Bulbosus", "Ranunculus Sceleratus", "Raphanus", "Ratanhia", "Rheum", "Rhododendron", "Rhus Aromatica",
    "Rhus Glabra", "Rhus Venenata", "Ricinus", "Robinia", "Rosa Damascena", "Rumex", "Ruta", "Sabadilla", "Sabal Serrulata", "Sabina", "Saccharum",
    "Salicylic Acid", "Sambucus Nigra", "Sanguinaria Canadensis", "Sanguinarina Nitrica", "Sanicula", "Santoninum", "Sarracenia", "Sarsaparilla", "Scutellaria", "Secale Cornutum",
    "Selenium", "Sempervivum", "Senecio Aureus", "Senega", "Senna", "Sepia", "Serum Anguillae", "Silica Marina", "Silphium", "Sinapis Alba",
    "Sinapis Nigra", "Skatol", "Solanum Nigrum", "Solidago", "Spigelia", "Spiraea", "Spiranthes", "Squilla", "Stannum Metallicum", "Sticta Pulmonaria",
    "Stillingia", "Stramonium", "Strontium Carbonicum", "Strophanthus", "Strychninum", "Succinum", "Sulphur Iodatum", "Sulphuric Acid", "Sumbul", "Symphoricarpus",
    "Tabacum", "Tanacetum", "Tarentula Cubensis", "Tarentula Hispanica", "Taraxacum", "Tellurium", "Terebinthina", "Teucrium Marum", "Thallium", "Thea",
    "Theridion", "Thlaspi Bursa", "Thuja", "Thymol", "Thyroidinum", "Tilia Europaea", "Titanium", "Tongo", "Trillium Pendulum", "Triosteum",
    "Trombidium", "Tuberculinum Aviaire", "Turnera", "Upas Tiente", "Uranium Nitricum", "Urea", "Urtica", "Usnea", "Ustilago", "Uva Ursi",
    "Vaccininum", "Valeriana", "Vanadium", "Variolinum", "Veratrum Viride", "Verbascum", "Verbena", "Vespa", "Viburnum Opulus", "Viburnum Prunifolium",
    "Vinca Minor", "Viola Odorata", "Viola Tricolor", "Vipera", "Viscum Album", "Wyethia", "X-Ray", "Xanthoxylum", "Xerophyllum", "Yohimbinum",
    "Yucca", "Zincum Phosphoricum", "Zincum Valerianum", "Zingiber", "Zizia",

    // Bach Flower Remedies
    "Agrimony", "Aspen", "Beech", "Centaury", "Cerato", "Cherry Plum", "Chestnut Bud", "Chicory", "Clematis",
    "Crab Apple", "Elm", "Gentian", "Gorse", "Heather", "Holly", "Honeysuckle", "Hornbeam", "Impatiens",
    "Larch", "Mimulus", "Mustard", "Oak", "Olive", "Pine", "Red Chestnut", "Rock Rose", "Rock Water",
    "Scleranthus", "Star of Bethlehem", "Sweet Chestnut", "Vervain", "Vine", "Walnut", "Water Violet",
    "White Chestnut", "Wild Oat", "Wild Rose", "Willow", "Rescue Remedy",

    // Indian Homeopathic Drugs
    "Abroma Augusta", "Abroma Radix", "Acalypha Indica", "Achyranthes Aspera", "Aegle Marmelos",
    "Andrographis Paniculata", "Atista Indica", "Azadirachta Indica", "Boerhaavia Diffusa", "Carica Papaya",
    "Cassia Sophera", "Cephalandra Indica", "Clerodendron Infortunatum", "Cynodon Dactylon",
    "Desmodium Gangeticum", "Embelia Ribes", "Ficus Religiosa", "Gymneama Sylvestre",
    "Holarrhena Antidysenterica", "Hydrocotyle Asiatica", "Janosia Ashoka", "Justicia Adhatoda",
    "Momordica Charantia", "Ocimum Sanctum", "Syzygium Jambolanum", "Terminalia Arjuna",
    "Tinospora Cordifolia", "Blumea Odorata", "Brahmi (Bacopa Monnieri)", "Calotropis Gigantea",

    // Bowel Nosodes & Rare
    "Morgan Pure", "Morgan Gaertner", "Proteus", "Sycotic Co", "Dysentery Co", "Gaertner",
    "Bacillus No. 7", "Mutabile", "Faecalis", "Oscillococcinum", "Carcinosin"
];

const materiaMedica = { ...majorRemedies };

// Generate entries for minor remedies with generic but helpful structure 
minorRemediesList.forEach(name => {
    if (!materiaMedica[name]) {
        materiaMedica[name] = {
            "Common Name": name,
            "Generalities": `A remedy often indicated in specific pathological states or organ affinities typical of ${name}. Consult comprehensive repertory for precise modalities.`,
            "Keynotes": "Refer to clinical indications. Often used in specific organ support or rare symptom pictures.",
            "Relationship": "Compare: Similar botanical or mineral families."
        };
    }
});

const outputPath = path.join(__dirname, '../backend/data/materia_medica.json');

// Ensure directory exists
const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(materiaMedica, null, 2));

console.log(`Materia Medica database generated with ${Object.keys(materiaMedica).length} entries at ${outputPath}`);
