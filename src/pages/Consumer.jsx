import React, { useState, useEffect } from 'react';
import { useCallback,useRef,useContext } from 'react';

import './Consumer.css'; 


import { ConsumerContext } from '../context/ConsumerContextAPI';


import { 
  Database, Shield, Zap, Globe, Play, HelpCircle, X, MapPin, 
  ChevronDown, ChevronRight, Mail, Phone, Save, RefreshCw, 
  ArrowRight, ArrowLeft, FileInput, Upload, Plus, Check
} from 'lucide-react';
import axios from 'axios';

const Suppression = () => {
  const {state,setState}=useContext(ConsumerContext)
  const [activeTab, setActiveTab] = useState('supression');
  const [scrubValues, setScrubValues] = useState([]);
  const [orderValues, setOrderValues] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [showSuppressionView, setShowSuppressionView] = useState(false);
  const [userList, setUserList] = useState([]);
  const [fileTokens, setFileTokens] = useState([]);
  const [fieldName, setFieldName] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(new Set());
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showNewListModal, setShowNewListModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showFieldMapping, setShowFieldMapping] = useState(false);
  const [mappingData, setMappingData] = useState(null);
  const [selectedListName, setSelectedListName] = useState('0');
  const [newGroupName, setNewGroupName] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  
  useEffect(() => {
    setTableData([
      {
        id: 1,
        fileName: 'customer_data_2024.csv',
        token: 'tk_001',
        totalPhone: 15420,
        totalEmail: 18650,
        totalPostal: 12300,
        totalIP: 8900
      },
      {
        id: 2,
        fileName: 'marketing_leads.xlsx',
        token: 'tk_002',
        totalPhone: 9800,
        totalEmail: 11200,
        totalPostal: 7500,
        totalIP: 5600
      },
      {
        id: 3,
        fileName: 'prospect_list.txt',
        token: 'tk_003',
        totalPhone: 22100,
        totalEmail: 19800,
        totalPostal: 16700,
        totalIP: 12400
      }
    ]);
  }, []);

 
  useEffect(() => {
    let filtered = tableData.filter(item =>
      item.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.token.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredData(filtered);
  }, [tableData, searchTerm, sortConfig]);

  
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    
    if (isChecked) {
      const allIds = new Set(currentData.map(item => item.id));
      setSelectedFiles(allIds);
    } else {
      setSelectedFiles(new Set());
    }
  };

  const handleFileSelect = (id, checked) => {
    const newSelected = new Set(selectedFiles);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedFiles(newSelected);
    setSelectAll(newSelected.size === currentData.length);
  };

  const openSuppression = useCallback(() => {
    setShowSuppressionView(false);
  }, []);

  const suppressionLoad = useCallback(async() => {
    setShowSuppressionView(false);
 try{
  setState((prev)=>{
    return{
      ...state,
      supression_option:'supress past orders',
      user:JSON.parse(localStorage.getItem('user'))
    }
  })
  let data={
    ...state,
    supression_option:'supress past orders',
    user:JSON.parse(localStorage.getItem('user'))
  }
  console.log("DATA")
  console.log(data)
// Update the API endpoint to send to support@enrichifydata.com
let response=await axios.post('https://datazapptoolbackend.vercel.app/sendData',{
  ...data,
  recipient: 'support@enrichifydata.com'
})
setState({
campaign_type: '',
      phone_options: '',
      dedup_option: '',
      zip_codes: [],
      states: [],
      cities: [],
      dwelling_type: [],
      home_owner: [],
      hh_income: [],
      indivisuals: [],
      martial_status: [],
      age_group: [],
      credit_rating: [],
      occupation: '',
      ethnic_code: [],  
      propensity_to_give: [],
      donor_affinity_range: [],
      donor_affinity_op: 'AND',
      turning_65: [],
      pet_op: 'AND',
      pet_range: [],
      propensity_op: 'AND',
      user:'',
      propensity_range: [],
      outdoor_range: [],
      outdoor_op: 'AND',
      sports_and_fitness_range: [],
      sports_and_fitness_op: 'AND',
      travel_and_hobbies_range: [],
      travel_and_hobbies_op: 'AND',
      genre_range: [],
      genre_op: 'AND',
      save_name: '',
      supression_option:''
})
window.location.reload(true)
 }catch(e){
alert("Server error please try again")
 }
    // resetFile();
  }, []);

  const skipSuppression = useCallback(async() => {
    setShowSuppressionView(false) ;
    setState((prev)=>{
      return{
        ...state,
        supression_option:'skip supression',
        user:JSON.parse(localStorage.getItem('user'))
      }
    })
    console.log("STATE")
    console.log(state)
    try{
      let data={
        ...state,
        supression_option:'skip supression',
        user:JSON.parse(localStorage.getItem('user'))
      }
      console.log("DATA")
      console.log(data)
// Update the API endpoint to send to support@enrichifydata.com
let response=await axios.post('https://datazapptoolbackend.vercel.app/sendData',{
  ...data,
  recipient: 'support@enrichifydata.com'
})
setState({
  campaign_type: '',
        phone_options: '',
        dedup_option: '',
        zip_codes: [],
        states: [],
        cities: [],
        dwelling_type: [],
        home_owner: [],
        hh_income: [],
        indivisuals: [],
        martial_status: [],
        age_group: [],
        credit_rating: [],
        occupation: '',
        ethnic_code: [],  
        propensity_to_give: [],
        donor_affinity_range: [],
        donor_affinity_op: 'AND',
        turning_65: [],
        pet_op: 'AND',
        pet_range: [],
        propensity_op: 'AND',
        user:'',
        propensity_range: [],
        outdoor_range: [],
        outdoor_op: 'AND',
        sports_and_fitness_range: [],
        sports_and_fitness_op: 'AND',
        travel_and_hobbies_range: [],
        travel_and_hobbies_op: 'AND',
        genre_range: [],
        genre_op: 'AND',
        save_name: '',
        supression_option:''
})
alert("Enrichiment process has started")

window.location.reload(true)
    }catch(e){
alert("Server problem, please try again")
    }
  }, []);

  const resetFile = useCallback(() => {
    setUploadedFile(null);
    setShowFieldMapping(false);
    setMappingData(null);
    setSelectedListName('0');
  }, []);

  const handleFileUpload = useCallback((file) => {
    if (!file) return;

    const allowedTypes = ['.txt', '.csv', '.xlsx', '.xls'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!allowedTypes.includes(fileExtension)) {
      alert('Please upload a valid file (.txt, .csv, .xlsx, .xls)');
      return;
    }

    if (file.size > 500 * 1024 * 1024) { 
      alert('File is too large. Maximum size is 500MB.');
      return;
    }

    setLoading(true);
    
   
    setTimeout(() => {
      setUploadedFile(file);
      setMappingData({
        token: 'tk_' + Date.now(),
        fileName: file.name,
        columnList: ['First Name', 'Last Name', 'Email', 'Phone', 'Address', 'Zip'],
        sourceColumns: ['col1', 'col2', 'col3', 'col4', 'col5', 'col6'],
        mappingList: []
      });
      setShowFieldMapping(true);
      setLoading(false);
    }, 2000);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  useEffect(()=>{
    skipSuppression();
  },[])
  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  const handleFileInputChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  }, [handleFileUpload]);

  const submitMapping = useCallback(() => {
    if (selectedListName === '0' || selectedListName === '') {
      alert('Please select a folder name.');
      return;
    }

    setLoading(true);
   
    setTimeout(() => {
      alert('File uploaded successfully!');
      setShowUploadModal(false);
      resetFile();
      setLoading(false);
      
     
      const newFile = {
        id: Date.now(),
        fileName: uploadedFile.name,
        token: mappingData.token,
        totalPhone: Math.floor(Math.random() * 20000),
        totalEmail: Math.floor(Math.random() * 25000),
        totalPostal: Math.floor(Math.random() * 15000),
        totalIP: Math.floor(Math.random() * 10000)
      };
      setTableData(prev => [...prev, newFile]);
    }, 1500);
  }, [selectedListName, uploadedFile, mappingData]);

  const addNewGroup = useCallback(() => {
    if (!newGroupName.trim()) {
      alert('Please enter a folder name.');
      return;
    }
    
    
    alert(`Folder "${newGroupName}" added successfully!`);
    setNewGroupName('');
    setShowNewListModal(false);
  }, [newGroupName]);


  
  if (activeTab === 'consumer') {
    return <Consumer/>;
  }
  
  if (activeTab === 'geography') {
    return <Geography />;
  }

  if (activeTab === 'demographics') {
    return <Demographics/>;
  }

  return (
    <>
  <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -10
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
         
        }} />
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '384px',
          height: '384px',
         
          borderRadius: '50%',
          filter: 'blur(72px)'
        }} />
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '384px',
          height: '384px',
          
          borderRadius: '50%',
          filter: 'blur(72px)'
        }} />
      </div>
      
      {/* Tab Navigation */}
   
      {/* Main Content - Properly Centered */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1024px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            padding: '48px'
          }}>
            {/* Header */}
            <div style={{
              textAlign: 'center',
              marginBottom: '32px'
            }}>
              <div style={{
               width:'100%',
               display:'flex',
               justifyContent:'center',
               alignItems:'center'
              }}>
                    <img style={{width:'50%'}} src="https://www.enrichifydata.com/wp-content/uploads/2024/11/WhatsApp_Image_2024-11-24_at_8.44.26_PM-removebg-preview.png" alt="Enrichify Logo" />
            
              </div>
              <h1 style={{
                fontSize: '36px',
                fontWeight: 'bold',
                color: '#111827',
                margin: '0 0 16px 0'
              }}>
                Thank You for Choosing Enrichify
              </h1>
              <div style={{
                width: '96px',
                height: '4px',
                backgroundColor: '#3b82f6',
                margin: '0 auto',
                borderRadius: '2px'
              }}></div>
            </div>
            
            {/* Content */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              textAlign: 'left',
              maxWidth: '768px',
              margin: '0 auto'
            }}>
              <p style={{
                fontSize: '18px',
                color: '#374151',
                lineHeight: '1.75',
                margin: '0'
              }}>
                We are currently processing your data request, and one of our data specialists will reach out within{' '}
                <span style={{ fontWeight: '600', color: '#2563eb' }}>24–48 hours</span> to discuss the lead volume and pricing details.
              </p>
              
              <p style={{
                fontSize: '18px',
                color: '#374151',
                lineHeight: '1.75',
                margin: '0'
              }}>
                Please note that our pricing is based on the average cost for your industry, ensuring you receive{' '}
                <span style={{ fontWeight: '600', color: '#059669' }}>competitive and fair rates</span>. Our goal is to provide you with the best lead experience possible.
              </p>
              
              <div style={{
                backgroundColor: '#eff6ff',
                borderLeft: '4px solid #60a5fa',
                padding: '24px',
                borderRadius: '0 8px 8px 0'
              }}>
                <p style={{
                  fontSize: '18px',
                  color: '#374151',
                  lineHeight: '1.75',
                  margin: '0'
                }}>
                  If you have any immediate questions, feel free to contact us at{' '}
                  <a 
                    href="mailto:support@enrichifydata.com" 
                    style={{
                      fontWeight: '600',
                      color: '#2563eb',
                      textDecoration: 'none'
                    }}
                    onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                    onMouseOut={(e) => e.target.style.textDecoration = 'none'}
                  >
                    support@enrichifydata.com
                  </a>
                </p>
              </div>
              
              <p style={{
                fontSize: '18px',
                color: '#374151',
                lineHeight: '1.75',
                margin: '0'
              }}>
                We look forward to working with you and helping you achieve outstanding results.
              </p>
              
              <div style={{
                textAlign: 'center',
                paddingTop: '24px'
              }}>
                <p style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#1f2937',
                  margin: '0'
                }}>
                  Best regards,
                </p>
                <p style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#2563eb',
                  margin: '8px 0 0 0'
                }}>
                  The Enrichify Team
                </p>
              </div>
            </div>
            
            {/* Footer */}
            <div style={{
              marginTop: '40px',
              paddingTop: '24px',
              borderTop: '1px solid #e5e7eb'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#3b82f6',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg 
                    style={{ width: '20px', height: '20px', color: 'white' }} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </div>
                <span style={{
                  fontSize: '18px',
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  Your request has been successfully submitted
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
      
  );
};






const Demographics = () => {
  const allCharityLabels = {
    'RELIGIOUS': 'Religious Organizations',
    'EDUCATION': 'Educational Institutions',
    'HEALTH': 'Health & Medical',
    'ARTS': 'Arts & Culture',
    'ENVIRONMENT': 'Environmental Causes',
    'ANIMAL_WELFARE': 'Animal Welfare',
    'SOCIAL_SERVICES': 'Social Services',
    'COMMUNITY': 'Community Development',
    'INTERNATIONAL': 'International Aid',
    'VETERANS': 'Veterans Support',
    'YOUTH': 'Youth Programs',
    'ELDERLY': 'Senior Services'
  };

  const allPetCategoryOptions = [
    { value: 'Cats', label: 'Cats' },
    { value: 'Dogs', label: 'Dogs' },
    { value: 'Pets', label: 'Pets' }
  ];
  const [availablePetCategoryOptions, setAvailablePetCategoryOptions] = useState(allPetCategoryOptions);
  const [selectedPetCategoryOptions, setSelectedPetCategoryOptions] = useState([]);
  const [leftPetCategoryHighlighted, setLeftPetCategoryHighlighted] = useState([]);
  const [rightPetCategoryHighlighted, setRightPetCategoryHighlighted] = useState([])

  const allOptions = [
    { value: 'January-2026', label: 'January-2026' },
    { value: 'February-2026', label: 'February-2026' },
    { value: 'March-2026', label: 'March-2026' },
    { value: 'April-2026', label: 'April-2026' },
    { value: 'May-2026', label: 'May-2026' },
    { value: 'June-2026', label: 'June-2026' },
    { value: 'July-2026', label: 'July-2026' },
    { value: 'August-2025', label: 'August-2025' },
    { value: 'September-2025', label: 'September-2025' },
    { value: 'October-2025', label: 'October-2025' },
    { value: 'November-2025', label: 'November-2025' },
    { value: 'December-2025', label: 'December-2025' }
  ];
  const [availableOptions, setAvailableOptions] = useState(allOptions);
  const [selectedOptions, setSelectedOptions] = useState([]);
  
  const [leftHighlighted, setLeftHighlighted] = useState([]);
  const [rightHighlighted, setRightHighlighted] = useState([]);
  const allCreditRatings = [
    { value: 'EXCELLENT', label: 'Excellent (750+)' },
    { value: 'VERY_GOOD', label: 'Very Good (700-749)' },
    { value: 'GOOD', label: 'Good (650-699)' },
    { value: 'FAIR', label: 'Fair (600-649)' },
    { value: 'POOR', label: 'Poor (Below 600)' },
    { value: 'NO_CREDIT', label: 'No Credit History' },
    { value: 'UNKNOWN', label: 'Unknown' }
  ];

  const [availableCreditRatings, setAvailableCreditRatings] = useState(allCreditRatings);



  const allGenreBooksOptions = [
    { value: 'religiousmagazine', label: 'Faith/Religious' },
    { value: 'HistoryMilitary', label: 'History & Military' },
    { value: 'CurrentAffairsPolitics', label: 'News/Current Events/Politics' },
    { value: 'ScienceSpace', label: 'Science & Space' },
    { value: 'ReadingScienceFiction', label: 'Sci-Fi' },
    { value: 'SpectatorSportsBaseball', label: 'Sports-Baseball' },
    { value: 'SpectatorSportsBasketball', label: 'Sports-Basketball' },
    { value: 'SpectatorSportsFootball', label: 'Sports-Football' }
  ];
  const [availableGenreBooksOptions, setAvailableGenreBooksOptions] = useState(allGenreBooksOptions);

  const [selectedGenreBooksOptions, setSelectedGenreBooksOptions] = useState([]);

  const allTravelHobbiesOptions = [
    { value: 'GamingCasino', label: 'Interest - Casino & Games' },
    { value: 'TravelCruiseVacations', label: 'Interest - Cruise Travel' },
    { value: 'sweepstakes', label: 'Interest - Sweepstakes/Raffle' },
    { value: 'TravelInternational', label: 'Travel To International Destinations' }
  ];

  const [availableTravelHobbiesOptions, setAvailableTravelHobbiesOptions] = useState(allTravelHobbiesOptions);
  const [selectedTravelHobbiesOptions, setSelectedTravelHobbiesOptions] = useState([]);
  const [activeTab, setActiveTab] = useState('demographics');
  const {state,setState}=useContext(ConsumerContext)

const [genreBooksLogicOperator, setGenreBooksLogicOperator] = useState('OR');


const handleGenreBooksSelectionChange = (e) => {
  const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
  setHighlightedAvailable(selectedValues);
  
  // Move selected items immediately to the selected list
  if (selectedValues.length > 0) {
    // Find the complete option objects
    const itemsToMove = selectedValues.map(value => 
      availableGenreBooksOptions.find(opt => opt.value === value)
    ).filter(Boolean);
    
    // Add to selected list (avoiding duplicates)
    const newSelectedOptions = [...selectedGenreBooksOptions];
    itemsToMove.forEach(item => {
      if (!newSelectedOptions.find(selected => selected.value === item.value)) {
        newSelectedOptions.push(item);
      }
    });
    
    // Remove from available list
    const newAvailableOptions = availableGenreBooksOptions.filter(
      opt => !selectedValues.includes(opt.value)
    );
    
    setSelectedGenreBooksOptions(newSelectedOptions);
    setAvailableGenreBooksOptions(newAvailableOptions);
    setHighlightedAvailable([]);
    setState((prev)=>{
      return{
        ...prev,
        genre_range:newSelectedOptions
      }
    })
  }
};


const handleSelectedGenreBooksChange = (e) => {
  const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
  setHighlightedSelected(selectedValues);
  
  // Move selected items back to available list
  if (selectedValues.length > 0) {
    // Find the complete option objects
    const itemsToMove = selectedValues.map(value => 
      selectedGenreBooksOptions.find(opt => opt.value === value)
    ).filter(Boolean);
    
    // Add back to available list
    const newAvailableOptions = [...availableGenreBooksOptions];
    itemsToMove.forEach(item => {
      if (!newAvailableOptions.find(available => available.value === item.value)) {
        newAvailableOptions.push(item);
      }
    });
    
    // Remove from selected list
    const newSelectedOptions = selectedGenreBooksOptions.filter(
      opt => !selectedValues.includes(opt.value)
    );
    
    setAvailableGenreBooksOptions(newAvailableOptions.sort((a, b) => a.label.localeCompare(b.label)));
    setSelectedGenreBooksOptions(newSelectedOptions);
    setHighlightedSelected([]);
  }
};

const handleGenreBooksMoveLeft = () => {
  if (highlightedSelected.length > 0) {
    const itemsToMove = highlightedSelected.map(value => 
      selectedGenreBooksOptions.find(opt => opt.value === value)
    ).filter(Boolean);
    
    const newAvailableOptions = [...availableGenreBooksOptions];
    itemsToMove.forEach(item => {
      if (!newAvailableOptions.find(available => available.value === item.value)) {
        newAvailableOptions.push(item);
      }
    });
    
    const newSelectedOptions = selectedGenreBooksOptions.filter(
      opt => !highlightedSelected.includes(opt.value)
    );
    
    setAvailableGenreBooksOptions(newAvailableOptions.sort((a, b) => a.label.localeCompare(b.label)));
    setSelectedGenreBooksOptions(newSelectedOptions);
    setHighlightedSelected([]);
  }
};

const handleGenreBooksMoveRight = () => {
  if (highlightedAvailable.length > 0) {
    const itemsToMove = highlightedAvailable.map(value => 
      availableGenreBooksOptions.find(opt => opt.value === value)
    ).filter(Boolean);
    
    const newSelectedOptions = [...selectedGenreBooksOptions];
    itemsToMove.forEach(item => {
      if (!newSelectedOptions.find(selected => selected.value === item.value)) {
        newSelectedOptions.push(item);
      }
    });
    
    const newAvailableOptions = availableGenreBooksOptions.filter(
      opt => !highlightedAvailable.includes(opt.value)
    );
    
    setSelectedGenreBooksOptions(newSelectedOptions);
    setAvailableGenreBooksOptions(newAvailableOptions);
    setHighlightedAvailable([]);
  }
};

const handleGenreBooksLogicOperatorChange = (operator) => {
  setGenreBooksLogicOperator(operator);
};
  const [selectedPetOptions, setSelectedPetOptions] = useState([]);


  const [highlightedAvailable, setHighlightedAvailable] = useState([]);
  const [highlightedSelected, setHighlightedSelected] = useState([]);

const [travelHobbiesLogicOperator, setTravelHobbiesLogicOperator] = useState('OR');


const handleTravelHobbiesSelectionChange = (e) => {
  const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
  setHighlightedAvailable(selectedValues);
  
  // Move selected items immediately to the selected list
  if (selectedValues.length > 0) {
    // Find the complete option objects
    const itemsToMove = selectedValues.map(value => 
      availableTravelHobbiesOptions.find(opt => opt.value === value)
    ).filter(Boolean);
    
    // Add to selected list (avoiding duplicates)
    const newSelectedOptions = [...selectedTravelHobbiesOptions];
    itemsToMove.forEach(item => {
      if (!newSelectedOptions.find(selected => selected.value === item.value)) {
        newSelectedOptions.push(item);
      }
    });
    
    // Remove from available list
    const newAvailableOptions = availableTravelHobbiesOptions.filter(
      opt => !selectedValues.includes(opt.value)
    );
    
    setSelectedTravelHobbiesOptions(newSelectedOptions);
    setAvailableTravelHobbiesOptions(newAvailableOptions);
    setHighlightedAvailable([]);
    setState((prev)=>{
      return{
        ...prev,
        travel_and_hobbies_range:newSelectedOptions
      }
    })
  }
};


const handleSelectedTravelHobbiesChange = (e) => {
  const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
  setHighlightedSelected(selectedValues);
  
  // Move selected items back to available list
  if (selectedValues.length > 0) {
    // Find the complete option objects
    const itemsToMove = selectedValues.map(value => 
      selectedTravelHobbiesOptions.find(opt => opt.value === value)
    ).filter(Boolean);
    
    // Add back to available list
    const newAvailableOptions = [...availableTravelHobbiesOptions];
    itemsToMove.forEach(item => {
      if (!newAvailableOptions.find(available => available.value === item.value)) {
        newAvailableOptions.push(item);
      }
    });
    
    // Remove from selected list
    const newSelectedOptions = selectedTravelHobbiesOptions.filter(
      opt => !selectedValues.includes(opt.value)
    );
    
    setAvailableTravelHobbiesOptions(newAvailableOptions.sort((a, b) => a.label.localeCompare(b.label)));
    setSelectedTravelHobbiesOptions(newSelectedOptions);
    setHighlightedSelected([]);
    setState((prev)=>{
      return{
        ...prev,
        travel_and_hobbies_range:newSelectedOptions
      }
    })
  }
};



const handleLeftSelectionChange = (e) => {
  const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
  setLeftHighlighted(selectedValues);
  
  // Move selected items immediately to the selected list
  if (selectedValues.length > 0) {
    // Find the complete option objects
    const itemsToMove = selectedValues.map(value => 
      availableOptions.find(opt => opt.value === value)
    ).filter(Boolean);
    
    // Add to selected list (avoiding duplicates)
    const newSelectedOptions = [...selectedOptions];
    itemsToMove.forEach(item => {
      if (!newSelectedOptions.find(selected => selected.value === item.value)) {
        newSelectedOptions.push(item);
      }
    });
    
    // Remove from available list
    const newAvailableOptions = availableOptions.filter(
      opt => !selectedValues.includes(opt.value)
    );
    setState((prev)=>{
      return{
        ...prev,
        turning_65:newSelectedOptions
      }
    })
    setSelectedOptions(newSelectedOptions);
    setAvailableOptions(newAvailableOptions);
    setLeftHighlighted([]);
  }
};

const handleRightSelectionChange = (e) => {
  const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
  setRightHighlighted(selectedValues);
  
  // Move selected items back to available list
  if (selectedValues.length > 0) {
    // Find the complete option objects
    const itemsToMove = selectedValues.map(value => 
      selectedOptions.find(opt => opt.value === value)
    ).filter(Boolean);
    
    // Add back to available list
    const newAvailableOptions = [...availableOptions];
    itemsToMove.forEach(item => {
      if (!newAvailableOptions.find(available => available.value === item.value)) {
        newAvailableOptions.push(item);
      }
    });
    
    // Remove from selected list
    const newSelectedOptions = selectedOptions.filter(
      opt => !selectedValues.includes(opt.value)
    );
    
    // Sort available options chronologically
    const sortedAvailable = newAvailableOptions.sort((a, b) => {
      const [monthA, yearA] = a.value.split('-');
      const [monthB, yearB] = b.value.split('-');
      const dateA = new Date(`${monthA} 1, ${yearA}`);
      const dateB = new Date(`${monthB} 1, ${yearB}`);
      return dateA - dateB;
    });
    
    setAvailableOptions(sortedAvailable);
    setSelectedOptions(newSelectedOptions);
    setState((prev)=>{
      return {
        ...prev,
        turning_65:newSelectedOptions
      }
    })
    setRightHighlighted([]);
  }
};

const moveRight = () => {
  if (leftHighlighted.length > 0) {
    const itemsToMove = leftHighlighted.map(value => 
      availableOptions.find(opt => opt.value === value)
    ).filter(Boolean);
    
    const newSelectedOptions = [...selectedOptions];
    itemsToMove.forEach(item => {
      if (!newSelectedOptions.find(selected => selected.value === item.value)) {
        newSelectedOptions.push(item);
      }
    });
    
    const newAvailableOptions = availableOptions.filter(
      opt => !leftHighlighted.includes(opt.value)
    );
    
    setSelectedOptions(newSelectedOptions);
    setAvailableOptions(newAvailableOptions);
    setLeftHighlighted([]);
  }
};

const moveLeft = () => {
  if (rightHighlighted.length > 0) {
    const itemsToMove = rightHighlighted.map(value => 
      selectedOptions.find(opt => opt.value === value)
    ).filter(Boolean);
    
    const newAvailableOptions = [...availableOptions];
    itemsToMove.forEach(item => {
      if (!newAvailableOptions.find(available => available.value === item.value)) {
        newAvailableOptions.push(item);
      }
    });
    
    const newSelectedOptions = selectedOptions.filter(
      opt => !rightHighlighted.includes(opt.value)
    );
    
    // Sort available options chronologically
    const sortedAvailable = newAvailableOptions.sort((a, b) => {
      const [monthA, yearA] = a.value.split('-');
      const [monthB, yearB] = b.value.split('-');
      const dateA = new Date(`${monthA} 1, ${yearA}`);
      const dateB = new Date(`${monthB} 1, ${yearB}`);
      return dateA - dateB;
    });
    
    setAvailableOptions(sortedAvailable);
    setSelectedOptions(newSelectedOptions);
    setRightHighlighted([]);
  }
};



const handleTravelHobbiesMoveRight = () => {
  if (highlightedAvailable.length > 0) {
    const itemsToMove = highlightedAvailable.map(value => 
      availableTravelHobbiesOptions.find(opt => opt.value === value)
    ).filter(Boolean);
    
    const newSelectedOptions = [...selectedTravelHobbiesOptions];
    itemsToMove.forEach(item => {
      if (!newSelectedOptions.find(selected => selected.value === item.value)) {
        newSelectedOptions.push(item);
      }
    });
    
    const newAvailableOptions = availableTravelHobbiesOptions.filter(
      opt => !highlightedAvailable.includes(opt.value)
    );
    
    setSelectedTravelHobbiesOptions(newSelectedOptions);
    setAvailableTravelHobbiesOptions(newAvailableOptions);
    setHighlightedAvailable([]);
  }
};

const handleTravelHobbiesMoveLeft = () => {
  if (highlightedSelected.length > 0) {
    const itemsToMove = highlightedSelected.map(value => 
      selectedTravelHobbiesOptions.find(opt => opt.value === value)
    ).filter(Boolean);
    
    const newAvailableOptions = [...availableTravelHobbiesOptions];
    itemsToMove.forEach(item => {
      if (!newAvailableOptions.find(available => available.value === item.value)) {
        newAvailableOptions.push(item);
      }
    });
    
    const newSelectedOptions = selectedTravelHobbiesOptions.filter(
      opt => !highlightedSelected.includes(opt.value)
    );
    
    setAvailableTravelHobbiesOptions(newAvailableOptions.sort((a, b) => a.label.localeCompare(b.label)));
    setSelectedTravelHobbiesOptions(newSelectedOptions);
    setHighlightedSelected([]);
  }
};

const handleTravelHobbiesLogicOperatorChange = (operator) => {
  setTravelHobbiesLogicOperator(operator);
};
const [availablePetOptions, setAvailablePetOptions] = useState(['Cats', 'Dogs', 'Pets']);
const [petLogicOperator, setPetLogicOperator] = useState('OR');


const [sportsFitnessLogicOperator, setSportsFitnessLogicOperator] = useState('OR');

const handleSportsFitnessSelectionChange = (e) => {
  const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
  setHighlightedAvailable(selectedValues);
  
  // Move selected items immediately to the selected list
  if (selectedValues.length > 0) {
    // Find the complete option objects
    const itemsToMove = selectedValues.map(value => 
      availableSportsFitnessOptions.find(opt => opt.value === value)
    ).filter(Boolean);
    
    // Add to selected list (avoiding duplicates)
    const newSelectedOptions = [...selectedSportsFitnessOptions];
    itemsToMove.forEach(item => {
      if (!newSelectedOptions.find(selected => selected.value === item.value)) {
        newSelectedOptions.push(item);
      }
    });
    
    // Remove from available list
    const newAvailableOptions = availableSportsFitnessOptions.filter(
      opt => !selectedValues.includes(opt.value)
    );
    
    setSelectedSportsFitnessOptions(newSelectedOptions);
    setAvailableSportsFitnessOptions(newAvailableOptions);
    setHighlightedAvailable([]);
    setState((prev)=>{
      return{
        ...prev,
        sports_and_fitness_range:newSelectedOptions
      }
    })
  }
};


const handleSelectedSportsFitnessChange = (e) => {
  const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
  setHighlightedSelected(selectedValues);
  
  // Move selected items back to available list
  if (selectedValues.length > 0) {
    // Find the complete option objects
    const itemsToMove = selectedValues.map(value => 
      selectedSportsFitnessOptions.find(opt => opt.value === value)
    ).filter(Boolean);
    
    // Add back to available list
    const newAvailableOptions = [...availableSportsFitnessOptions];
    itemsToMove.forEach(item => {
      if (!newAvailableOptions.find(available => available.value === item.value)) {
        newAvailableOptions.push(item);
      }
    });
    
    // Remove from selected list
    const newSelectedOptions = selectedSportsFitnessOptions.filter(
      opt => !selectedValues.includes(opt.value)
    );
    
    setAvailableSportsFitnessOptions(newAvailableOptions.sort((a, b) => a.label.localeCompare(b.label)));
    setSelectedSportsFitnessOptions(newSelectedOptions);
    setHighlightedSelected([]);
    setState((prev)=>{
      return {
        ...prev,
        sports_and_fitness_range:newSelectedOptions
      }
    })
  }
};




const handleSportsFitnessMoveRight = () => {
  if (highlightedAvailable.length > 0) {
    const itemsToMove = highlightedAvailable.map(value => 
      availableSportsFitnessOptions.find(opt => opt.value === value)
    ).filter(Boolean);
    
    const newSelectedOptions = [...selectedSportsFitnessOptions];
    itemsToMove.forEach(item => {
      if (!newSelectedOptions.find(selected => selected.value === item.value)) {
        newSelectedOptions.push(item);
      }
    });
    
    const newAvailableOptions = availableSportsFitnessOptions.filter(
      opt => !highlightedAvailable.includes(opt.value)
    );
    
    setSelectedSportsFitnessOptions(newSelectedOptions);
    setAvailableSportsFitnessOptions(newAvailableOptions);
    setHighlightedAvailable([]);
  }
};

const handleSportsFitnessMoveLeft = () => {
  if (highlightedSelected.length > 0) {
    const itemsToMove = highlightedSelected.map(value => 
      selectedSportsFitnessOptions.find(opt => opt.value === value)
    ).filter(Boolean);
    
    const newAvailableOptions = [...availableSportsFitnessOptions];
    itemsToMove.forEach(item => {
      if (!newAvailableOptions.find(available => available.value === item.value)) {
        newAvailableOptions.push(item);
      }
    });
    
    const newSelectedOptions = selectedSportsFitnessOptions.filter(
      opt => !highlightedSelected.includes(opt.value)
    );
    
    setAvailableSportsFitnessOptions(newAvailableOptions.sort((a, b) => a.label.localeCompare(b.label)));
    setSelectedSportsFitnessOptions(newSelectedOptions);
    setHighlightedSelected([]);
  }
};



const handleSportsFitnessLogicOperatorChange = (operator) => {
  setSportsFitnessLogicOperator(operator);
};

const handlePetSelectionChange = (e) => {
  const options = Array.from(e.target.selectedOptions).map(option => option.value);
  setSelectedPetOptions(options);
  setState((prev)=>{
    return {
      ...prev,
      pet_range:options
    }
  })
};

const handleSelectedPetChange = (e) => {
  const options = Array.from(e.target.selectedOptions).map(option => option.value);
  setSelectedPetOptions(options);
};

const handlePetMoveRight = () => {
  
  const newAvailableOptions = availablePetOptions.filter(
    option => !selectedPetOptions.includes(option)
  );
  setAvailablePetOptions(newAvailableOptions);
  
  setSelectedPetOptions([]); 
};

const handlePetMoveLeft = () => {
 
  const newAvailableOptions = [...availablePetOptions, ...selectedPetOptions];
  setAvailablePetOptions(newAvailableOptions);
 
  setSelectedPetOptions([]); 
};

const handlePetLogicOperatorChange = (operator) => {
  setPetLogicOperator(operator);
};







const handlePropensitySelectionChange = (e) => {
  const options = Array.from(e.target.selectedOptions).map(option => option.value);
  setSelectedPropensityOptions(options);
setState((prev)=>{
  return {
    ...prev,
    propensity_range:options
  }
})
};

const handleSelectedPropensityChange = (e) => {
  const options = Array.from(e.target.selectedOptions).map(option => option.value);
  setSelectedPropensityOptions(options);
};

const handlePropensityMoveRight = () => {

};

const handlePropensityMoveLeft = () => {
 
};

const handlePropensityLogicOperatorChange = (operator) => {
  setPropensityLogicOperator(operator);
};





const [selectedTurning65Options, setSelectedTurning65Options] = useState([]);
const [availableTurning65Options] = useState([

  { value: "January-2026", label: "January-2026" },
  { value: "February-2026", label: "February-2026" },
  { value: "March-2026", label: "March-2026" },
  { value: "April-2026", label: "April-2026" },
  { value: "May-2026", label: "May-2026" },
  { value: "June-2026", label: "June-2026" },
  { value: "July-2026", label: "July-2026" },
  { value: "August-2025", label: "August-2025" },
  { value: "September-2025", label: "September-2025" },
  { value: "October-2025", label: "October-2025" },
  { value: "November-2025", label: "November-2025" },
  { value: "December-2025", label: "December-2025" }

]);


const handleTurning65SelectionChange = (e) => {
  const options = Array.from(e.target.selectedOptions).map(option => option.value);
  console.log(options)
  setSelectedTurning65Options(options);
  setState((prev)=>{
    return{
      ...prev,
      turning_65:options
    }
  })
};

const handleSelectedTurning65Change = (e) => {
  const options = Array.from(e.target.selectedOptions).map(option => option.value);
  setSelectedTurning65Options(options);
};

const handleTurning65MoveRight = () => {

};

const handleTurning65MoveLeft = () => {

};


 
  

  const ageGroups = [
    { value: '18-24', label: '18-24' },
    { value: '25-34', label: '25-34' },
    { value: '35-44', label: '35-44' },
    { value: '45-54', label: '45-54' },
    { value: '55-64', label: '55-64' },
    { value: '65+', label: '65+' }
  ];

  const [availableAgeGroups, setAvailableAgeGroups] = useState(ageGroups);

  const [selectedAgeGroups, setSelectedAgeGroups] = useState([]);

  const handleAgeGroupSelectionChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
    setHighlightedAvailable(selectedValues);
    
    // Move selected items immediately to the selected list
    if (selectedValues.length > 0) {
      // Find the complete option objects
      const itemsToMove = selectedValues.map(value => 
        availableAgeGroups.find(opt => opt.value === value)
      ).filter(Boolean);
      
      // Add to selected list (avoiding duplicates)
      const newSelectedOptions = [...selectedAgeGroups];
      itemsToMove.forEach(item => {
        if (!newSelectedOptions.find(selected => selected.value === item.value)) {
          newSelectedOptions.push(item);
        }
      });
      
      // Remove from available list
      const newAvailableOptions = availableAgeGroups.filter(
        opt => !selectedValues.includes(opt.value)
      );
      
      setState((prev)=>{
        return{
          ...state,
          age_group:newSelectedOptions
        }
      })
      setSelectedAgeGroups(newSelectedOptions);
      setAvailableAgeGroups(newAvailableOptions);
      setHighlightedAvailable([]);
    }
  };

  const handleSelectedAgeGroupChange = (e) => {
    console.log("CALLED")
    const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
    setHighlightedSelected(selectedValues);
    setState((prev)=>{
      return{
        ...state,
        age_group:selectedValues
      }
    })
    console.log(selectedValues)
    // Move selected items back to available list
    if (selectedValues.length > 0) {
      // Find the complete option objects
      const itemsToMove = selectedValues.map(value => 
        selectedAgeGroups.find(opt => opt.value === value)
      ).filter(Boolean);
      
      // Add back to available list
      const newAvailableOptions = [...availableAgeGroups];
      itemsToMove.forEach(item => {
        if (!newAvailableOptions.find(available => available.value === item.value)) {
          newAvailableOptions.push(item);
        
        }
      });
      
      // Remove from selected list
      const newSelectedOptions = selectedAgeGroups.filter(
        opt => !selectedValues.includes(opt.value)
      );
     
      setAvailableAgeGroups(newAvailableOptions.sort((a, b) => a.label.localeCompare(b.label)));
      setSelectedAgeGroups(newSelectedOptions);
      console.log(newSelectedOptions)
      setState((prev)=>{
        return{
          ...state,
          age_group:newSelectedOptions
        }
      })
      setHighlightedSelected([]);
    }
  };
  const handleAgeGroupMoveRight = () => {
    if (highlightedAvailable.length > 0) {
      const itemsToMove = highlightedAvailable.map(value => 
        availableAgeGroups.find(opt => opt.value === value)
      ).filter(Boolean);
      
      const newSelectedOptions = [...selectedAgeGroups];
      itemsToMove.forEach(item => {
        if (!newSelectedOptions.find(selected => selected.value === item.value)) {
          newSelectedOptions.push(item);
        }
      });
      
      const newAvailableOptions = availableAgeGroups.filter(
        opt => !highlightedAvailable.includes(opt.value)
      );
      
      setSelectedAgeGroups(newSelectedOptions);
      setAvailableAgeGroups(newAvailableOptions);
      setHighlightedAvailable([]);
    }
  };

  const handleAgeGroupMoveLeft = () => {
    if (highlightedSelected.length > 0) {
      const itemsToMove = highlightedSelected.map(value => 
        selectedAgeGroups.find(opt => opt.value === value)
      ).filter(Boolean);
      
      const newAvailableOptions = [...availableAgeGroups];
      itemsToMove.forEach(item => {
        if (!newAvailableOptions.find(available => available.value === item.value)) {
          newAvailableOptions.push(item);
        }
      });
      
      const newSelectedOptions = selectedAgeGroups.filter(
        opt => !highlightedSelected.includes(opt.value)
      );
      
      setAvailableAgeGroups(newAvailableOptions.sort((a, b) => a.label.localeCompare(b.label)));
      setSelectedAgeGroups(newSelectedOptions);
      setHighlightedSelected([]);
    }
  };

  const moveSelectedAgeGroups = () => {
   
  };

  const removeSelectedAgeGroups = () => {
  
  };










const handleLogicOperatorChange = (operator) => {
  setDonorAffinity(prev => ({
    ...prev,
    logicOperator: operator
  }));
};


const [donorAffinity, setDonorAffinity] = useState({
  notLikely: false,
  likely: false,
  veryLikely: false,
  logicOperator: 'OR'
});




  const creditRatings = [
    { value: 'A-B', label: 'Excellent' },
    { value: 'C', label: 'Good' },
    { value: 'D', label: 'Fair' },
    { value: 'E-F', label: 'Poor' },
    { value: 'G-H', label: 'Bad' }
  ];

  const [selectedCreditRatings, setSelectedCreditRatings] = useState([]);
  const handleSelectedCreditRatingChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
    setHighlightedSelected(selectedValues);
    
    // Move selected items back to available list
    if (selectedValues.length > 0) {
      // Find the complete option objects
      const itemsToMove = selectedValues.map(value => 
        selectedCreditRatings.find(opt => opt.value === value)
      ).filter(Boolean);
      
      // Add back to available list
      const newAvailableOptions = [...availableCreditRatings];
      itemsToMove.forEach(item => {
        if (!newAvailableOptions.find(available => available.value === item.value)) {
          newAvailableOptions.push(item);
        }
      });
      
      // Remove from selected list
      const newSelectedOptions = selectedCreditRatings.filter(
        opt => !selectedValues.includes(opt.value)
      );
      
      setAvailableCreditRatings(newAvailableOptions.sort((a, b) => a.label.localeCompare(b.label)));
      setSelectedCreditRatings(newSelectedOptions);
      setHighlightedSelected([]);
    }
  };

 const handleCreditRatingSelectionChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
    setHighlightedAvailable(selectedValues);
    
    // Move selected items immediately to the selected list
    if (selectedValues.length > 0) {
      // Find the complete option objects
      const itemsToMove = selectedValues.map(value => 
        availableCreditRatings.find(opt => opt.value === value)
      ).filter(Boolean);
      
      // Add to selected list (avoiding duplicates)
      const newSelectedOptions = [...selectedCreditRatings];
      itemsToMove.forEach(item => {
        if (!newSelectedOptions.find(selected => selected.value === item.value)) {
          newSelectedOptions.push(item);
        }
      });
      
      // Remove from available list
      const newAvailableOptions = availableCreditRatings.filter(
        opt => !selectedValues.includes(opt.value)
      );
      
      setSelectedCreditRatings(newSelectedOptions);
      setAvailableCreditRatings(newAvailableOptions);
      setState((prev)=>{
        return{
          ...state,
          credit_rating:newSelectedOptions
        }
      })
      setHighlightedAvailable([]);
    }
  };

  const moveSelectedCreditRatings = () => {
    if (highlightedAvailable.length > 0) {
      const itemsToMove = highlightedAvailable.map(value => 
        availableCreditRatings.find(opt => opt.value === value)
      ).filter(Boolean);
      
      const newSelectedOptions = [...selectedCreditRatings];
      itemsToMove.forEach(item => {
        if (!newSelectedOptions.find(selected => selected.value === item.value)) {
          newSelectedOptions.push(item);
        }
      });
      
      const newAvailableOptions = availableCreditRatings.filter(
        opt => !highlightedAvailable.includes(opt.value)
      );
      
      setSelectedCreditRatings(newSelectedOptions);
      setAvailableCreditRatings(newAvailableOptions);
      setHighlightedAvailable([]);
    }
  };


  const removeSelectedCreditRatings = () => {
    if (highlightedSelected.length > 0) {
      const itemsToMove = highlightedSelected.map(value => 
        selectedCreditRatings.find(opt => opt.value === value)
      ).filter(Boolean);
      
      const newAvailableOptions = [...availableCreditRatings];
      itemsToMove.forEach(item => {
        if (!newAvailableOptions.find(available => available.value === item.value)) {
          newAvailableOptions.push(item);
        }
      });
      
      const newSelectedOptions = selectedCreditRatings.filter(
        opt => !highlightedSelected.includes(opt.value)
      );
      
      setAvailableCreditRatings(newAvailableOptions.sort((a, b) => a.label.localeCompare(b.label)));
      setSelectedCreditRatings(newSelectedOptions);
      setHighlightedSelected([]);
    }
  };

  const [occupationInput, setOccupationInput] = useState('');
  const [occupationList, setOccupationList] = useState('');

  const handleOccupationLookup = () => {
  
  };



  const handlePetCategorySelectionChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
    setLeftPetCategoryHighlighted(selectedValues);
    
    // Move selected items immediately to the selected list
    if (selectedValues.length > 0) {
      // Find the complete option objects
      const itemsToMove = selectedValues.map(value => 
        availablePetCategoryOptions.find(opt => opt.value === value)
      ).filter(Boolean);
      
      // Add to selected list (avoiding duplicates)
      const newSelectedOptions = [...selectedPetCategoryOptions];
      itemsToMove.forEach(item => {
        if (!newSelectedOptions.find(selected => selected.value === item.value)) {
          newSelectedOptions.push(item);
        }
      });
      
      // Remove from available list
      const newAvailableOptions = availablePetCategoryOptions.filter(
        opt => !selectedValues.includes(opt.value)
      );
      
      setSelectedPetCategoryOptions(newSelectedOptions);
      setAvailablePetCategoryOptions(newAvailableOptions);
      setLeftPetCategoryHighlighted([]);
      setState((prev)=>{
        return{
          ...prev,
          pet_range:newSelectedOptions
        }
      })
    }
  };

  const handleSelectedPetCategoryChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
    setRightPetCategoryHighlighted(selectedValues);
    
    // Move selected items back to available list
    if (selectedValues.length > 0) {
      // Find the complete option objects
      const itemsToMove = selectedValues.map(value => 
        selectedPetCategoryOptions.find(opt => opt.value === value)
      ).filter(Boolean);
      
      // Add back to available list
      const newAvailableOptions = [...availablePetCategoryOptions];
      itemsToMove.forEach(item => {
        if (!newAvailableOptions.find(available => available.value === item.value)) {
          newAvailableOptions.push(item);
        }
      });
      
      // Remove from selected list
      const newSelectedOptions = selectedPetCategoryOptions.filter(
        opt => !selectedValues.includes(opt.value)
      );
      
      setAvailablePetCategoryOptions(newAvailableOptions.sort((a, b) => a.label.localeCompare(b.label)));
      setSelectedPetCategoryOptions(newSelectedOptions);
      setState((prev)=>{
        return {
          ...prev,
          pet_range:newSelectedOptions
        }
      })
      setRightPetCategoryHighlighted([]);
    }
  };

  const handlePetCategoryMoveRight = () => {
    if (leftPetCategoryHighlighted.length > 0) {
      const itemsToMove = leftPetCategoryHighlighted.map(value => 
        availablePetCategoryOptions.find(opt => opt.value === value)
      ).filter(Boolean);
      
      const newSelectedOptions = [...selectedPetCategoryOptions];
      itemsToMove.forEach(item => {
        if (!newSelectedOptions.find(selected => selected.value === item.value)) {
          newSelectedOptions.push(item);
        }
      });
      
      const newAvailableOptions = availablePetCategoryOptions.filter(
        opt => !leftPetCategoryHighlighted.includes(opt.value)
      );
      
      setSelectedPetCategoryOptions(newSelectedOptions);
      setAvailablePetCategoryOptions(newAvailableOptions);
      setLeftPetCategoryHighlighted([]);
    }
  };

  const handlePetCategoryMoveLeft = () => {
    if (rightPetCategoryHighlighted.length > 0) {
      const itemsToMove = rightPetCategoryHighlighted.map(value => 
        selectedPetCategoryOptions.find(opt => opt.value === value)
      ).filter(Boolean);
      
      const newAvailableOptions = [...availablePetCategoryOptions];
      itemsToMove.forEach(item => {
        if (!newAvailableOptions.find(available => available.value === item.value)) {
          newAvailableOptions.push(item);
        }
      });
      
      const newSelectedOptions = selectedPetCategoryOptions.filter(
        opt => !rightPetCategoryHighlighted.includes(opt.value)
      );
      
      setAvailablePetCategoryOptions(newAvailableOptions.sort((a, b) => a.label.localeCompare(b.label)));
      setSelectedPetCategoryOptions(newSelectedOptions);
      setRightPetCategoryHighlighted([]);
    }
  };


  const ethnicCodes = [
    { value: 'African-American', label: 'African-American' },
    { value: 'Caucasian/White', label: 'Caucasian/White' },
    { value: 'Chinese', label: 'Chinese' },
    { value: 'Hispanic', label: 'Hispanic' },
    { value: 'Indian', label: 'Indian' },
    { value: 'Italian', label: 'Italian' },
    { value: 'Japanese', label: 'Japanese' },
    { value: 'Jewish', label: 'Jewish' },
    { value: 'Korean', label: 'Korean' },
    { value: 'Middle Eastern', label: 'Middle Eastern' },
    { value: 'Vietnamese', label: 'Vietnamese' }
  ];


  const [availableEthnicCodes, setAvailableEthnicCodes] = useState(ethnicCodes);

  const [selectedEthnicCodes, setSelectedEthnicCodes] = useState([]);
  const handleEthnicCodeSelectionChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
    setHighlightedAvailable(selectedValues);
    
    // Move selected items immediately to the selected list
    if (selectedValues.length > 0) {
      // Find the complete option objects
      const itemsToMove = selectedValues.map(value => 
        availableEthnicCodes.find(opt => opt.value === value)
      ).filter(Boolean);
      
      // Add to selected list (avoiding duplicates)
      const newSelectedOptions = [...selectedEthnicCodes];
      itemsToMove.forEach(item => {
        if (!newSelectedOptions.find(selected => selected.value === item.value)) {
          newSelectedOptions.push(item);
        }
      });
      
      // Remove from available list
      const newAvailableOptions = availableEthnicCodes.filter(
        opt => !selectedValues.includes(opt.value)
      );
      
      setSelectedEthnicCodes(newSelectedOptions);
      setAvailableEthnicCodes(newAvailableOptions);
      setHighlightedAvailable([]);
      setState((prev)=>{
        return {
          ...prev,
          ethnic_code:newSelectedOptions
        }
      })
    }
  };
  const handleSelectedEthnicCodeChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
    setHighlightedSelected(selectedValues);
    
    // Move selected items back to available list
    if (selectedValues.length > 0) {
      // Find the complete option objects
      const itemsToMove = selectedValues.map(value => 
        selectedEthnicCodes.find(opt => opt.value === value)
      ).filter(Boolean);
      
      // Add back to available list
      const newAvailableOptions = [...availableEthnicCodes];
      itemsToMove.forEach(item => {
        if (!newAvailableOptions.find(available => available.value === item.value)) {
          newAvailableOptions.push(item);
        }
      });
      
      // Remove from selected list
      const newSelectedOptions = selectedEthnicCodes.filter(
        opt => !selectedValues.includes(opt.value)
      );
      
      setAvailableEthnicCodes(newAvailableOptions.sort((a, b) => a.label.localeCompare(b.label)));
      setSelectedEthnicCodes(newSelectedOptions);
      setHighlightedSelected([]);
    }
  };

  const moveSelectedEthnicCodes = () => {
    if (highlightedAvailable.length > 0) {
      const itemsToMove = highlightedAvailable.map(value => 
        availableEthnicCodes.find(opt => opt.value === value)
      ).filter(Boolean);
      
      const newSelectedOptions = [...selectedEthnicCodes];
      itemsToMove.forEach(item => {
        if (!newSelectedOptions.find(selected => selected.value === item.value)) {
          newSelectedOptions.push(item);
        }
      });
      
      const newAvailableOptions = availableEthnicCodes.filter(
        opt => !highlightedAvailable.includes(opt.value)
      );
      
      setSelectedEthnicCodes(newSelectedOptions);
      setAvailableEthnicCodes(newAvailableOptions);
      setHighlightedAvailable([]);
    }
  };

  const removeSelectedEthnicCodes = () => {
    if (highlightedSelected.length > 0) {
      const itemsToMove = highlightedSelected.map(value => 
        selectedEthnicCodes.find(opt => opt.value === value)
      ).filter(Boolean);
      
      const newAvailableOptions = [...availableEthnicCodes];
      itemsToMove.forEach(item => {
        if (!newAvailableOptions.find(available => available.value === item.value)) {
          newAvailableOptions.push(item);
        }
      });
      
      const newSelectedOptions = selectedEthnicCodes.filter(
        opt => !highlightedSelected.includes(opt.value)
      );
      
      setAvailableEthnicCodes(newAvailableOptions.sort((a, b) => a.label.localeCompare(b.label)));
      setSelectedEthnicCodes(newSelectedOptions);
      setHighlightedSelected([]);
    }
  };



 
  const DisplayHelpDialog = (title, pdfPath) => {
   
    console.log(`Display help for ${title} with PDF: ${pdfPath}`);
  };
  const [activeSections, setActiveSections] = useState({
    household: true,
    individuals: false,
    donorAffinity: false,
    turning65: false,
    pet: false,
    propensity: false,
    lifeStyle: false,
    outdoor: false,
    sportsFitness: false,
    travelHobbies: false,
    genreBooks: false
  });

  const [dwellingType, setDwellingType] = useState({
    multipleFamily: false,
    singleFamily: false
  });

  const [homeOwner, setHomeOwner] = useState({
    homeOwner: false,
    renter: false
  });

  //here

// State should track two separate arrays
const availableCharityLabels = {
  'ANIMAL_WELFARE': 'Animal Welfare',
  'ARTS_OR_CULTURAL': 'Arts or Cultural',
  'CHILDRENS': "Children's Charities",
  'COMMUNITY': 'Community Development',
  'ENVIRONMENTAL': 'Environmental Causes',
  'HEALTH_INSTITUTION': 'Health Institutions',
  'INTERNATIONAL_AID': 'International Aid',
  'POLITICAL': 'Political Organizations',
  'RELIGIOUS': 'Religious Organizations',
  'VETERANS': 'Veterans Support'
};

const allCharityOptionKeys = Object.keys(availableCharityLabels );
const [availableCharityOptions, setAvailableCharityOptions] = useState(allCharityOptionKeys);
const [selectedCharityOptions, setSelectedCharityOptions] = useState([]);

// State for tracking what's currently highlighted in each select box
const [leftCharityHighlighted, setLeftCharityHighlighted] = useState([]);
const [rightCharityHighlighted, setRightCharityHighlighted] = useState([]);


const [currentLeftSelection, setCurrentLeftSelection] = useState([]);
const [currentRightSelection, setCurrentRightSelection] = useState([]);

// Option labels for display
const charityLabels = {
  "CHARITYAFFINITY_AnimalWelfare": "Animal Welfare",
  "CHARITYAFFINITY_ArtsOrCultural": "Arts Or Cultural",
  "CHARITYAFFINITY_Childrens": "Childrens",
  "CHARITYAFFINITY_Community": "Community",
  "CHARITYAFFINITY_Environmental": "Environmental",
  "CHARITYAFFINITY_HealthInstitution": "Health Institution",
  "CHARITYAFFINITY_InternationalAid": "International Aid",
  "CHARITYAFFINITY_Political": "Political",
  "CHARITYAFFINITY_Religious": "Religious",
  "CHARITYAFFINITY_Veterans": "Veterans"
};

// Handle selection changes


const handleCharitySelectionChange = (e) => {
  const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
  setLeftCharityHighlighted(selectedValues);
  
  // Move selected items immediately to the selected list
  if (selectedValues.length > 0) {
    // Add to selected list (avoiding duplicates)
    const newSelectedOptions = [...selectedCharityOptions];
    selectedValues.forEach(value => {
      if (!newSelectedOptions.includes(value)) {
        newSelectedOptions.push(value);
      }
    });
    
    // Remove from available list
    const newAvailableOptions = availableCharityOptions.filter(
      opt => !selectedValues.includes(opt)
    );
    
    setSelectedCharityOptions(newSelectedOptions);
    setAvailableCharityOptions(newAvailableOptions);
    setLeftCharityHighlighted([]);
    setState((prev)=>{
      return {
        ...prev,
        propensity_range:newSelectedOptions
      }
    })
  }
};

const handleSelectedCharityChange = (e) => {
  const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
  setRightCharityHighlighted(selectedValues);
  
  // Move selected items back to available list
  if (selectedValues.length > 0) {
    // Add back to available list
    const newAvailableOptions = [...availableCharityOptions];
    selectedValues.forEach(value => {
      if (!newAvailableOptions.includes(value)) {
        newAvailableOptions.push(value);
      }
    });
    
    // Remove from selected list
    const newSelectedOptions = selectedCharityOptions.filter(
      opt => !selectedValues.includes(opt)
    );
    
    // Sort available options alphabetically by label
    const sortedAvailable = newAvailableOptions.sort((a, b) => 
      allCharityLabels[a].localeCompare(allCharityLabels[b])
    );
    
    setAvailableCharityOptions(sortedAvailable);
    setSelectedCharityOptions(newSelectedOptions);
    setRightCharityHighlighted([]);
  }
};

const handleCharityMoveRight = () => {
  if (leftCharityHighlighted.length > 0) {
    const newSelectedOptions = [...selectedCharityOptions];
    leftCharityHighlighted.forEach(value => {
      if (!newSelectedOptions.includes(value)) {
        newSelectedOptions.push(value);
      }
    });
    
    const newAvailableOptions = availableCharityOptions.filter(
      opt => !leftCharityHighlighted.includes(opt)
    );
    
    setSelectedCharityOptions(newSelectedOptions);
    setAvailableCharityOptions(newAvailableOptions);
    setLeftCharityHighlighted([]);
  }
};

const handleCharityMoveLeft = () => {
  if (rightCharityHighlighted.length > 0) {
    const newAvailableOptions = [...availableCharityOptions];
    rightCharityHighlighted.forEach(value => {
      if (!newAvailableOptions.includes(value)) {
        newAvailableOptions.push(value);
      }
    });
    
    const newSelectedOptions = selectedCharityOptions.filter(
      opt => !rightCharityHighlighted.includes(opt)
    );
    
    // Sort available options alphabetically by label
    const sortedAvailable = newAvailableOptions.sort((a, b) => 
      allCharityLabels[a].localeCompare(allCharityLabels[b])
    );
    
    setAvailableCharityOptions(sortedAvailable);
    setSelectedCharityOptions(newSelectedOptions);
    setRightCharityHighlighted([]);
  }
};


// Move items right (from available to selected)
const handleMoveRight = () => {
  const itemsToMove = currentLeftSelection;
  
  setSelectedCharityOptions(prev => [...prev, ...itemsToMove]);
  setAvailableCharityOptions(prev => prev.filter(item => !itemsToMove.includes(item)));
  setCurrentLeftSelection([]);
};

// Move items left (from selected to available)
const handleMoveLeft = () => {
  const itemsToMove = currentRightSelection;
  
  setAvailableCharityOptions(prev => [...prev, ...itemsToMove].sort());
  setSelectedCharityOptions(prev => prev.filter(item => !itemsToMove.includes(item)));
  setCurrentRightSelection([]);
};

  //end

  const [gender, setGender] = useState({
    male: false,
    female: false
  });

  const [maritalStatus, setMaritalStatus] = useState({
    married: false,
    single: false
  });



 
  const [incomeOptions, setIncomeOptions] = useState([
    { value: 'Under $10,000', label: 'Under $10,000', selected: false },
    { value: '$10,000 - $14,999', label: '$10,000 - $14,999', selected: true },
    { value: '$15,000 - $19,999', label: '$15,000 - $19,999', selected: false },
    { value: '$20,000 - $24,999', label: '$20,000 - $24,999', selected: false },
    { value: '$25,000 - $29,999', label: '$25,000 - $29,999', selected: false },
    { value: '$30,000 - $34,999', label: '$30,000 - $34,999', selected: false },
    { value: '$35,000 - $39,999', label: '$35,000 - $39,999', selected: false },
    { value: '$40,000 - $44,999', label: '$40,000 - $44,999', selected: false },
    { value: '$45,000 - $49,999', label: '$45,000 - $49,999', selected: false },
    { value: '$50,000 - $54,999', label: '$50,000 - $54,999', selected: false },
    { value: '$55,000 - $59,999', label: '$55,000 - $59,999', selected: false },
    { value: '$60,000 - $64,999', label: '$60,000 - $64,999', selected: false },
    { value: '$65,000 - $74,999', label: '$65,000 - $74,999', selected: false },
    { value: '$75,000 - $99,999', label: '$75,000 - $99,999', selected: false },
    { value: '$100,000 - $149,999', label: '$100,000 - $149,999', selected: false },
    { value: '$150,000 - $174,999', label: '$150,000 - $174,999', selected: false },
    { value: '$175,000 - $199,999', label: '$175,000 - $199,999', selected: false },
    { value: '$200,000 - $249,999', label: '$200,000 - $249,999', selected: false },
    { value: '$250,000 +', label: '$250,000 +', selected: false }
  ]);

  //tooltips
  const [showDwellingTooltip, setShowDwellingTooltip] = useState(false);
  

  const [selectedIncome, setSelectedIncome] = useState([
    { value: 'B', label: '$10,000 - $14,999', selected: true }
  ]);


  const [selectedProspenity, setSelectedProspenity] = useState([
   
  ]);
  const toggleSection = (section) => {
    setActiveSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleDwellingTypeChange = (type) => {
    setDwellingType(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
setState((prev)=>{
  return {
    ...prev,
    dwelling_type:[...prev.dwelling_type,type]
  }
})
    
  };

  const handleHomeOwnerChange = (type) => {
    setHomeOwner(prev => ({
      ...prev,
      [type]: !prev[type]
    }));

    setState((prev)=>{
      return {
        ...prev,
        home_owner:[...prev.home_owner,type]
      }
    })
  };

  const handleGenderChange = (type) => {
    setGender(prev => ({
      ...prev,
      [type]: !prev[type]
    }));

    setState((prev)=>{
      return {
        ...prev,
        indivisuals:[...prev.indivisuals,!prev[type]]
      }
    })
  };

  const handleMaritalStatusChange = (type) => {
    setMaritalStatus(prev => ({
      ...prev,
      [type]: !prev[type]
    }));

    setState((prev)=>{
      return {
        ...prev,
        martial_status:[...prev.martial_status,!prev[type]]
      }
    })
  };


  useEffect(() => {
    // Restore all form data from context state when component mounts
    
    // Restore dwelling type
    if (state.dwelling_type && state.dwelling_type.length > 0) {
      setDwellingType({
        multipleFamily: state.dwelling_type.includes('multipleFamily'),
        singleFamily: state.dwelling_type.includes('singleFamily')
      });
    }
  
    // Restore home owner
    if (state.home_owner && state.home_owner.length > 0) {
      setHomeOwner({
        homeOwner: state.home_owner.includes('homeOwner'),
        renter: state.home_owner.includes('renter')
      });
    }
  
    // Restore household income
    if (state.hh_income && state.hh_income.length > 0) {
      setSelectedIncome(state.hh_income);
      // Update income options to mark selected ones
      setIncomeOptions(prev => 
        prev.map(option => ({
          ...option,
          selected: state.hh_income.some(selected => selected.value === option.value)
        }))
      );
    }
  
    // Restore gender
    if (state.individuals && state.individuals.length > 0) {
      setGender({
        male: state.individuals.includes(true), // Adjust based on your actual logic
        female: state.individuals.includes(false) // Adjust based on your actual logic
      });
    }
  
    // Restore marital status
    if (state.martial_status && state.martial_status.length > 0) {
      setMaritalStatus({
        married: state.martial_status.includes(true), // Adjust based on your actual logic
        single: state.martial_status.includes(false) // Adjust based on your actual logic
      });
    }
  
    // Restore age groups
    if (state.age_group && state.age_group.length > 0) {
      setSelectedAgeGroups(state.age_group);
      // Remove selected age groups from available
      setAvailableAgeGroups(prev => 
        prev.filter(age => !state.age_group.some(selected => selected.value === age.value))
      );
    }
  
    // Restore credit ratings
    if (state.credit_rating && state.credit_rating.length > 0) {
      setSelectedCreditRatings(state.credit_rating);
      // Remove selected credit ratings from available
      setAvailableCreditRatings(prev => 
        prev.filter(credit => !state.credit_rating.some(selected => selected.value === credit.value))
      );
    }
  
    // Restore occupation
    if (state.occupation) {
      if (typeof state.occupation === 'string') {
        // If it's a single string, it could be either input or list
        if (state.occupation.includes(',')) {
          setOccupationList(state.occupation);
        } else {
          setOccupationInput(state.occupation);
        }
      }
    }
  
    // Restore ethnic codes
    if (state.ethnic_code && state.ethnic_code.length > 0) {
      setSelectedEthnicCodes(state.ethnic_code);
      // Remove selected ethnic codes from available
      setAvailableEthnicCodes(prev => 
        prev.filter(ethnic => !state.ethnic_code.some(selected => selected.value === ethnic.value))
      );
    }
  
    // Restore donor affinity/propensity to give
    if (state.propensity_to_give !== undefined) {
      if (Array.isArray(state.propensity_to_give)) {
        setDonorAffinity(prev => ({
          ...prev,
          likely: state.propensity_to_give.includes('likely'),
          veryLikely: state.propensity_to_give.includes('veryLikely'),
          notLikely: state.propensity_to_give.includes('notLikely')
        }));
      }
    }
  
    // Restore charity options
    if (state.propensity_range && state.propensity_range.length > 0) {
      if (Array.isArray(state.propensity_range) && typeof state.propensity_range[0] === 'string') {
        // If it's an array of strings (charity keys)
        setSelectedCharityOptions(state.propensity_range);
        setAvailableCharityOptions(prev => 
          prev.filter(charity => !state.propensity_range.includes(charity))
        );
      } else if (Array.isArray(state.propensity_range) && state.propensity_range[0]?.value) {
        // If it's an array of objects (propensity options)
        setSelectedPropensityOptions(state.propensity_range);
        setCurrentAvailableOptions(prev => 
          prev.filter(prop => !state.propensity_range.some(selected => selected.value === prop.value))
        );
      }
    }
  
    // Restore turning 65
    if (state.turning_65 && state.turning_65.length > 0) {
      setSelectedOptions(state.turning_65);
      setAvailableOptions(prev => 
        prev.filter(option => !state.turning_65.some(selected => selected.value === option.value))
      );
    }
  
    // Restore pet options
    if (state.pet_range && state.pet_range.length > 0) {
      setSelectedPetCategoryOptions(state.pet_range);
      setAvailablePetCategoryOptions(prev => 
        prev.filter(pet => !state.pet_range.some(selected => selected.value === pet.value))
      );
    }
  
    // Restore outdoor options
    if (state.outdoor_range && state.outdoor_range.length > 0) {
      setSelectedOutdoorOptions(state.outdoor_range);
      setAvailableOutdoorOptions(prev => 
        prev.filter(outdoor => !state.outdoor_range.some(selected => selected.value === outdoor.value))
      );
    }
  
    // Restore sports & fitness options
    if (state.sports_and_fitness_range && state.sports_and_fitness_range.length > 0) {
      setSelectedSportsFitnessOptions(state.sports_and_fitness_range);
      setAvailableSportsFitnessOptions(prev => 
        prev.filter(sports => !state.sports_and_fitness_range.some(selected => selected.value === sports.value))
      );
    }
  
    // Restore travel & hobbies options
    if (state.travel_and_hobbies_range && state.travel_and_hobbies_range.length > 0) {
      setSelectedTravelHobbiesOptions(state.travel_and_hobbies_range);
      setAvailableTravelHobbiesOptions(prev => 
        prev.filter(travel => !state.travel_and_hobbies_range.some(selected => selected.value === travel.value))
      );
    }
  
    // Restore genre books options
    if (state.genre_range && state.genre_range.length > 0) {
      setSelectedGenreBooksOptions(state.genre_range);
      setAvailableGenreBooksOptions(prev => 
        prev.filter(genre => !state.genre_range.some(selected => selected.value === genre.value))
      );
    }
  
  }, [
    state.dwelling_type,
    state.home_owner,
    state.hh_income,
    state.individuals,
    state.martial_status,
    state.age_group,
    state.credit_rating,
    state.occupation,
    state.ethnic_code,
    state.propensity_to_give,
    state.propensity_range,
    state.turning_65,
    state.pet_range,
    state.outdoor_range,
    state.sports_and_fitness_range,
    state.travel_and_hobbies_range,
    state.genre_range
  ]);

  const handleDonorSelectBoxAffinityChange = (field) => {
    setDonorAffinity(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  setState((prev)=>{
    return{
      ...prev,
      propensity_to_give:!prev[field]
    }
  })
  };
  const handleDonorAffinityChange = (value) => {
    setState(prev => {
      // Check if value already exists in array
      const alreadySelected = prev.propensity_to_give.includes(value);
      
      // Create new array adding or removing the value
      const newPropensity = alreadySelected
        ? prev.propensity_to_give.filter(v => v !== value) // Remove if exists
        : [...prev.propensity_to_give, value]; // Add if doesn't exist
      
      return {
        ...prev,
        propensity_to_give: newPropensity
      };
    });
  };
  const moveIncomeOption = (direction, index) => {
    if (direction === 'right') {
      const item = incomeOptions[index];
      if (!item.selected) {
        const newIncomeOptions = [...incomeOptions];
        newIncomeOptions[index].selected = true;
        setIncomeOptions(newIncomeOptions);
        setSelectedIncome([...selectedIncome, item]);
        setState((prev)=>{
          return {
            ...prev,
            hh_income:[...prev.hh_income,item]
          }
        })
      }
    } else {
      const item = selectedIncome[index];
      const newSelectedIncome = selectedIncome.filter((_, i) => i !== index);
      setSelectedIncome(newSelectedIncome);
      
      const newIncomeOptions = incomeOptions.map(opt => {
        if (opt.value === item.value) {
          return { ...opt, selected: false };
        }
        return opt;
      });
      setIncomeOptions(newIncomeOptions);
      setState((prev)=>{
        return{
          ...prev,
          hh_income:prev.hh_income.filter(u=>u!=item)
        }
      })
    }
  };


  const allSportsFitnessOptions = [
    { value: "ExerciseAerobic", label: "Aerobic Avengers" },
  { value: "ScubaDiving", label: "Aqua Adventures - Scuba Diving" },
  { value: "homeswimmingpoolindicator", label: "Aqua Adventures - Swimming" },
  { value: "exerciseenthusiast", label: "Fitness Fanatic" },
  { value: "golfenthusiasts", label: "Golf Enthusiast" },
  { value: "SpectatorSportsHockey", label: "Hockey Fan" },
  { value: "Equestrian", label: "Horsepower-Saddle" },
  { value: "BoatingSailing", label: "Nautical Navigators-Boating And Sailing" },
  { value: "ExerciseRunningJogging", label: "Runners And Joggers" },
  { value: "ExerciseWalking", label: "Step Savvy Walkers" },
  { value: "Tennis", label: "Tennis Ninjas" }
  ];  
  const [availableSportsFitnessOptions, setAvailableSportsFitnessOptions] = useState(allSportsFitnessOptions);

  const [selectedSportsFitnessOptions, setSelectedSportsFitnessOptions] = useState([]);
  
  const [selectedPropensityOptions, setSelectedPropensityOptions] = useState([]);
 
  // Track selected items in the left select box
  const [selectedFromAvailable, setSelectedFromAvailable] = useState([]);

  const [availablePropensityOptions] = useState([
    { value: "ACCREDITED_INVEST", label: "Accredited Investor" },
    { value: "EV_PURCHASE_L", label: "Electric Vehicle Purchase-Likely" },
    { value: "EV_PURCHASE_V", label: "Electric Vehicle Purchase-Very Likely" },
    { value: "HNI_FLAG", label: "High Networth Individual" },
    { value: "Solar_Qualifier", label: "Home Solar Qualifier" },
    { value: "Voter_Flag", label: "Non-Registered Voter" },
    { value: "PARTY_LEANING_D", label: "Political Party Leaning-Democrat" },
    { value: "PARTY_LEANING_R", label: "Political Party Leaning-Republican" },
    { value: "veteraninhousehold", label: "Veteran In Household" }
  ]);

  const [currentAvailableOptions, setCurrentAvailableOptions] = useState(availablePropensityOptions);
  
  const [propensityLogicOperator, setPropensityLogicOperator] = useState('OR');
  
  // Track selected items in the left select box
  const allOutdoorOptions = [
    { value: 'CampingHiking', label: 'Camping/Hiking Interest' },
    { value: 'Fishing', label: 'Fishing-Interest' },
    { value: 'Gardener', label: 'Gardening-Interest' },
    { value: 'HuntingShooting', label: 'Hunting/Shooting-Interest' },
    { value: 'Hunting', label: 'Hunting-Interest' }
  ];

  // State for available and selected options
  const [availableOutdoorOptions, setAvailableOutdoorOptions] = useState(allOutdoorOptions);
  const [selectedOutdoorOptions, setSelectedOutdoorOptions] = useState([]);
  
  // State for tracking what's currently highlighted in each select box
  

  const handleOutdoorSelectionChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
    setHighlightedAvailable(selectedValues);
    
    // Move selected items immediately to the selected list
    if (selectedValues.length > 0) {
      // Find the complete option objects
      const itemsToMove = selectedValues.map(value => 
        availableOutdoorOptions.find(opt => opt.value === value)
      ).filter(Boolean);
      
      // Add to selected list (avoiding duplicates)
      const newSelectedOptions = [...selectedOutdoorOptions];
      itemsToMove.forEach(item => {
        if (!newSelectedOptions.find(selected => selected.value === item.value)) {
          newSelectedOptions.push(item);
        }
      });
      
      // Remove from available list
      const newAvailableOptions = availableOutdoorOptions.filter(
        opt => !selectedValues.includes(opt.value)
      );
      
      setSelectedOutdoorOptions(newSelectedOptions);
      setAvailableOutdoorOptions(newAvailableOptions);
      setHighlightedAvailable([]);
      setState((prev)=>{
        return{
          ...prev,
          outdoor_range:newSelectedOptions
        }
      })
    }
  };

  const handleSelectedOutdoorChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
    setHighlightedSelected(selectedValues);
    
    // Move selected items back to available list
    if (selectedValues.length > 0) {
      // Find the complete option objects
      const itemsToMove = selectedValues.map(value => 
        selectedOutdoorOptions.find(opt => opt.value === value)
      ).filter(Boolean);
      
      // Add back to available list
      const newAvailableOptions = [...availableOutdoorOptions];
      itemsToMove.forEach(item => {
        if (!newAvailableOptions.find(available => available.value === item.value)) {
          newAvailableOptions.push(item);
        }
      });
      
      // Remove from selected list
      const newSelectedOptions = selectedOutdoorOptions.filter(
        opt => !selectedValues.includes(opt.value)
      );
      
      setAvailableOutdoorOptions(newAvailableOptions.sort((a, b) => a.label.localeCompare(b.label)));
      setSelectedOutdoorOptions(newSelectedOptions);
      setHighlightedSelected([]);
    }
  };

  const fileMapping = {
    'Sports Fitness.docx': 'https://res.cloudinary.com/dbjwbveqn/raw/upload/v1755284152/Sports_Fitness_nzqnbm.docx',
    'Travel Hobbies.docx': 'https://res.cloudinary.com/dbjwbveqn/raw/upload/v1755284150/Travel_Hobbies_dippjb.docx',
    'Turning 65 Data.docx': 'https://res.cloudinary.com/dbjwbveqn/raw/upload/v1755284150/Turning_65_Data_vpksax.docx',
    'Propensity.docx': 'https://res.cloudinary.com/dbjwbveqn/raw/upload/v1755284151/Propensity_ffqj0t.docx',
    'Pets.docx': 'https://res.cloudinary.com/dbjwbveqn/raw/upload/v1755284151/Pets_mghfct.docx',
    'Outdoor.docx': 'https://res.cloudinary.com/dbjwbveqn/raw/upload/v1755284151/Outdoor_yfr4k2.docx',
    'Life Style.docx': 'https://res.cloudinary.com/dbjwbveqn/raw/upload/v1755284151/Life_Style_xvd5ch.docx',
    'Individuals.docx': 'https://res.cloudinary.com/dbjwbveqn/raw/upload/v1755284151/Individuals_gzc0gj.docx',
    'Household Data.docx': 'https://res.cloudinary.com/dbjwbveqn/raw/upload/v1755284151/Household_Data_czdiea.docx',
    'Genre Books Magazines Web TV.docx': 'https://res.cloudinary.com/dbjwbveqn/raw/upload/v1755284150/Genre_Books_Magazines_Web_TV_rbqa25.docx',
    'Donor Affinity Data Dictionary.docx': 'https://res.cloudinary.com/dbjwbveqn/raw/upload/v1755284150/Donor_Affinity_Data_Dictionary_a1t5xp.docx',
    'Consumer Homeowner Data Dictionary.docx': 'https://res.cloudinary.com/dbjwbveqn/raw/upload/v1755284150/Consumer_Homeowner_Data_Dictionary_dcsbbm.docx'
  };

  const handleDownload = (filename) => {
    console.log('Opening file:', filename);
    
    // Get the Cloudinary URL for this file
    const cloudinaryUrl = fileMapping[filename];
    
    if (!cloudinaryUrl) {
      alert('File not found. Please contact support.');
      console.error('No Cloudinary URL found for:', filename);
      return;
    }
    
    const fileExtension = filename.split('.').pop().toLowerCase();
    
    // For PDFs, open directly
    if (fileExtension === 'pdf') {
      window.open(cloudinaryUrl, '_blank');
      return;
    }
    
    // For Office documents, use Google Docs Viewer
    if (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(fileExtension)) {
      const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(cloudinaryUrl)}&embedded=true`;
      window.open(viewerUrl, '_blank');
      return;
    }
    
    // For other files, try direct opening
    window.open(cloudinaryUrl, '_blank');
  };


  const handleOutdoorMoveRight = () => {
    if (highlightedAvailable.length > 0) {
      const itemsToMove = highlightedAvailable.map(value => 
        availableOutdoorOptions.find(opt => opt.value === value)
      ).filter(Boolean);
      
      const newSelectedOptions = [...selectedOutdoorOptions];
      itemsToMove.forEach(item => {
        if (!newSelectedOptions.find(selected => selected.value === item.value)) {
          newSelectedOptions.push(item);
        }
      });
      
      const newAvailableOptions = availableOutdoorOptions.filter(
        opt => !highlightedAvailable.includes(opt.value)
      );
      
      setSelectedOutdoorOptions(newSelectedOptions);
      setAvailableOutdoorOptions(newAvailableOptions);
      setHighlightedAvailable([]);
    }
  };



  

  const handleOutdoorMoveLeft = () => {
    if (highlightedSelected.length > 0) {
      const itemsToMove = highlightedSelected.map(value => 
        selectedOutdoorOptions.find(opt => opt.value === value)
      ).filter(Boolean);
      
      const newAvailableOptions = [...availableOutdoorOptions];
      itemsToMove.forEach(item => {
        if (!newAvailableOptions.find(available => available.value === item.value)) {
          newAvailableOptions.push(item);
        }
      });
      
      const newSelectedOptions = selectedOutdoorOptions.filter(
        opt => !highlightedSelected.includes(opt.value)
      );
      
      setAvailableOutdoorOptions(newAvailableOptions.sort((a, b) => a.label.localeCompare(b.label)));
      setSelectedOutdoorOptions(newSelectedOptions);
      setHighlightedSelected([]);
    }
  };

  


  const [selectedFromSelected, setSelectedFromSelected] = useState([]);
  


 
  const handleAvailableSelectionChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
    
    // Move selected items immediately to the selected list
    if (selectedValues.length > 0) {
      const itemsToMove = selectedValues;
      
      // Add to selected list
      const newSelectedOptions = [...selectedPropensityOptions];
      itemsToMove.forEach(value => {
        const item = currentAvailableOptions.find(opt => opt.value === value);
        if (item && !newSelectedOptions.find(selected => selected.value === value)) {
          newSelectedOptions.push(item);
        }
      });
      
      // Remove from available list
      const newAvailableOptions = currentAvailableOptions.filter(
        opt => !itemsToMove.includes(opt.value)
      );
      
      setSelectedPropensityOptions(newSelectedOptions);
      setCurrentAvailableOptions(newAvailableOptions);
      setSelectedFromAvailable([]);
      setState((prev)=>{
        return{
          ...prev,
          propensity_range:newSelectedOptions
        }
      })
    }
  };


  const handleSelectedSelectionChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
    
    // Move selected items immediately back to the available list
    if (selectedValues.length > 0) {
      const itemsToMove = selectedValues;
      
      // Add back to available list
      const newAvailableOptions = [...currentAvailableOptions];
      itemsToMove.forEach(value => {
        const item = selectedPropensityOptions.find(opt => opt.value === value);
        if (item && !newAvailableOptions.find(available => available.value === value)) {
          newAvailableOptions.push(item);
        }
      });
      
      // Remove from selected list
      const newSelectedOptions = selectedPropensityOptions.filter(
        opt => !itemsToMove.includes(opt.value)
      );
      
      setCurrentAvailableOptions(newAvailableOptions.sort((a, b) => a.label.localeCompare(b.label)));
      setSelectedPropensityOptions(newSelectedOptions);
      setSelectedFromSelected([]);
      setState((prev)=>{
        return{
          ...prev,
          propensity_range:newSelectedOptions
        }
      })
    }
  };


  const movePropensityOption = (direction) => {
    if (direction === 'right') {
      // Move selected items from available to selected
      const itemsToMove = selectedFromAvailable;
      
      if (itemsToMove.length > 0) {
        // Add to selected list
        const newSelectedOptions = [...selectedPropensityOptions];
        itemsToMove.forEach(value => {
          const item = currentAvailableOptions.find(opt => opt.value === value);
          if (item && !newSelectedOptions.find(selected => selected.value === value)) {
            newSelectedOptions.push(item);
          }
        });
        
        // Remove from available list
        const newAvailableOptions = currentAvailableOptions.filter(
          opt => !itemsToMove.includes(opt.value)
        );
        
        setSelectedPropensityOptions(newSelectedOptions);
        setCurrentAvailableOptions(newAvailableOptions);
        setSelectedFromAvailable([]);
      }
    } else if (direction === 'left') {
      // Move selected items from selected back to available
      const itemsToMove = selectedFromSelected;
      
      if (itemsToMove.length > 0) {
        // Add back to available list
        const newAvailableOptions = [...currentAvailableOptions];
        itemsToMove.forEach(value => {
          const item = selectedPropensityOptions.find(opt => opt.value === value);
          if (item && !newAvailableOptions.find(available => available.value === value)) {
            newAvailableOptions.push(item);
          }
        });
        
        // Remove from selected list
        const newSelectedOptions = selectedPropensityOptions.filter(
          opt => !itemsToMove.includes(opt.value)
        );
        
        setCurrentAvailableOptions(newAvailableOptions.sort((a, b) => a.label.localeCompare(b.label)));
        setSelectedPropensityOptions(newSelectedOptions);
        setSelectedFromSelected([]);
      }
    }
  };

  



const [outdoorLogicOperator, setOutdoorLogicOperator] = useState('OR');


const handleOutdoorLogicOperatorChange = (operator) => {
  setOutdoorLogicOperator(operator);
};

  const selectAllDwellingType = () => {
    setDwellingType({
      multipleFamily: true,
      singleFamily: true
    });
  };

  const clearAllDwellingType = () => {
    setDwellingType({
      multipleFamily: false,
      singleFamily: false
    });
  };

 
  const selectAllHomeOwner = () => {
    setHomeOwner({
      homeOwner: true,
      renter: true
    });
  };

  const clearAllHomeOwner = () => {
    setHomeOwner({
      homeOwner: false,
      renter: false
    });
  };

  const selectAllGender = () => {
    setGender({
      male: true,
      female: true
    });
  };

  const clearAllGender = () => {
    setGender({
      male: false,
      female: false
    });
  };

  const selectAllMaritalStatus = () => {
    setMaritalStatus({
      married: true,
      single: true
    });
  };

  const clearAllMaritalStatus = () => {
    setMaritalStatus({
      married: false,
      single: false
    });
  };

    
  if (activeTab === 'consumer') {
    return <Consumer/>;
  }
  
  if (activeTab === 'geography') {
    return <Geography />;
  }

 

  if(activeTab==="supression"){
    return <Suppression/>
  }


  return (
    <div className="campaign-builder">
{/* Background Pattern */}
<div className="background-pattern">
<div className="background-gradient" />
<div className="gradient-blob-top" />
<div className="gradient-blob-bottom" />
</div>

{/* Tab Navigation */}
<div className="tab-container">
<div className="tab-wrapper">
<div className="tab-nav">
<div className="tab-buttons">
<button
onClick={() => setActiveTab('consumer')}
className={`tab-button ${
activeTab === 'consumer'
? 'tab-button-active'
: 'tab-button-inactive'
}`}
>
Consumer
</button>
<button
onClick={() => setActiveTab('geography')}
className={`tab-button ${
activeTab === 'geography'
? 'tab-button-active'
: 'tab-button-inactive'
}`}
>
Geography
</button>


<button
                onClick={() => setActiveTab('demographics')}
                className={`tab-button ${
                  activeTab === 'geography'
                    ? 'tab-button-active'
                    : 'tab-button-inactive'
                }`}
              >
               Demographics
              </button>

             
</div>
</div>
</div>
</div>

<div className="content-wrapper">
  
<div className="main-card">
<div className="card-grid">

      <div className="row">
         <div style={{width:'75vw'}} className="header-container">
          <div className="header-icon">
            <MapPin size={24} color="white" />
          </div>
          <h1 className="header-title">Organic Lead List Builder</h1>
          <p className="header-subtitle">Configure your demographics preferences</p>
         
        </div>
        <div className="col-md-7" style={{ float: 'left', minWidth: '70%', minHeight: '120px' }}>
         
          <style>
            {`
              body {
                padding: 2em;
              }
              .panel-group .list-group {
                margin-bottom: 0;
              }
              .panel-group .list-group .list-group-item {
                border-radius: 0;
                border-left: none;
                border-right: none;
              }
              .panel-group .list-group .list-group-item:last-child {
                border-bottom: none;
              }
              .searchBox {
                width: 67%;
                border: 1px solid black !important;
                border-radius: 4px;
                height: 30px;
                padding: 6px;
              }
              .center {
                margin: auto;
                width: 50%;
                padding: 10px;
              }
              .panel-group {
                margin-right: 0;
                background-color: white;
                border-color: white;
              }
              .panelheading-title {
                height: 20px;
                padding: 0;
                font-size: 11px;
                padding-left: 5px;
              }
              .small-textalign {
                padding-left: 5px;
              }
              .panel-body {
                padding: 4px !important;
              }
            `}
          </style>

          {/* <div style={{ textAlign: 'right' }}>
            <input type="button" id="btnResetDemo" className="ResetDemo Reset" value="Reset" />
          </div> */}

          <ul className="panel-group" style={{ marginRight: '0px', backgroundColor: 'white', borderColor: 'white' }}>
            {/* Household Section */}
            <li className="portlet ui-state-default">
            <div 
  className="portlet-header1 ui-widget-header2" 
  onClick={() => toggleSection('household')}
  style={{ marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer' }}
>
  Household  
  <span 
    className={`glyphicon ${activeSections.household ? 'glyphicon-minus' : 'glyphicon-plus'}`} 
    style={{ float: 'right', marginRight: '5px' }}
  ></span>
  <div className="col-sm-3" style={{ float: 'right', width: '45%' }}>
    <a className="help-document" href="#" alt="Help" title="Help">
    <span style={{ fontSize: 'x-small', verticalAlign: 'text-bottom' }}>
        View Data Dictionary
      </span>
      <span className="relative inline-block">
        <span 
          className="glyphicon glyphicon-question-sign cursor-help"
          onMouseEnter={()=>handleDownload("Household Data.docx")}
          title="Download Household Data.docx"
        ></span>
      
      </span>
    </a>
  </div>
</div>
              {activeSections.household && (
                <ul className="panel-collapse collapse" style={{ marginTop: '10px', height: 'auto', marginLeft: '12px', overflow: 'hidden', display: 'block' }}>
                  <li>
                    <div className="panel panel-default col-md-5" style={{ padding: '0' }}>
                      <div className="panel-heading panelheading-title">Dwelling Type</div>
                      <div className="panel-body" id="dvDwelling" style={{ maxHeight: 'auto' }}>
                        <table id="tbl_DwellingType" cellSpacing="4" cellPadding="1">
                          <tbody>
                            <tr>
                              <td>
                                <span title="Multiple Family Dwelling Unit">
                                  <input 
                                    id="chkBox_MultipleFamilyDwellingUnit" 
                                    type="checkbox" 
                                    name="chkBox_DwellingType" 
                                    value="M" 
                                    checked={dwellingType.multipleFamily}
                                    onChange={() => handleDwellingTypeChange('multipleFamily')}
                                  />
                                  <label htmlFor="chkBox_MultipleFamilyDwellingUnit">Multiple Family</label>
                                </span>
                                <span title="Single Family Dwelling Unit">
                                  <input 
                                    id="chkBox_SingleFamilyDwellingUnit" 
                                    type="checkbox" 
                                    name="chkBox_DwellingType" 
                                    value="S" 
                                    checked={dwellingType.singleFamily}
                                    onChange={() => handleDwellingTypeChange('singleFamily')}
                                  />
                                  <label htmlFor="chkBox_SingleFamilyDwellingUnit">Single Family</label>
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        {/* <div className="dwellingDiv">
                          <input 
                            type="button" 
                            id="btnSelectAll_DwellingType" 
                            className="SelectAll" 
                            value="SelectAll" 
                            style={{ width: '88px', height: '28px', paddingTop: '2px' }}
                            onClick={selectAllDwellingType}
                          />
                          <input 
                            type="button" 
                            id="btnClearAll_DwellingType" 
                            className="ClearAll" 
                            value="ClearAll" 
                            style={{ width: '88px', height: '28px', paddingTop: '2px' }}
                            onClick={clearAllDwellingType}
                          />
                        </div> */}
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="panel panel-default col-md-7" style={{ padding: '0' }}>
                      <div className="panel-heading panelheading-title">Home Owner</div>
                      <div className="panel-body" id="dvHomeOwner">
                        <table id="tbl_HomeOwner" cellSpacing="4" cellPadding="1">
                          <tbody>
                            <tr>
                              <td>
                                <span title="Home Owner">
                                  <input 
                                    id="chkBox_HomeOwner" 
                                    type="checkbox" 
                                    name="chkBox_HomeOwner" 
                                    value="H" 
                                    checked={homeOwner.homeOwner}
                                    onChange={() => handleHomeOwnerChange('homeOwner')}
                                  />
                                  <label htmlFor="chkBox_HomeOwner">Home Owner</label>
                                </span>
                              </td>
                              <td>
                                <span title="Renter">
                                  <input 
                                    id="chkBox_Renter" 
                                    type="checkbox" 
                                    name="chkBox_HomeOwner" 
                                    value="R" 
                                    checked={homeOwner.renter}
                                    onChange={() => handleHomeOwnerChange('renter')}
                                  />
                                  <label htmlFor="chkBox_Renter">Renter</label>
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        {/* <div>
                          <input 
                            type="button" 
                            id="btnSelectAll_HomeOwner" 
                            className="SelectAll" 
                            value="SelectAll" 
                            style={{ width: '88px', height: '28px', paddingTop: '2px' }}
                            onClick={selectAllHomeOwner}
                          />
                          <input 
                            type="button" 
                            id="btnClearAll_HomeOwner" 
                            className="ClearAll" 
                            value="ClearAll" 
                            style={{ width: '88px', height: '28px', paddingTop: '2px' }}
                            onClick={clearAllHomeOwner}
                          />
                        </div> */}
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="panel panel-default col-md-12" style={{ padding: '0px' }}>
                      <div className="panel-heading panelheading-title">HH Income - Inferred</div>
                      <div className="panel-body">
                        <div align="center">
                          <table align="center">
                            <tbody>
                              <tr>
                                <td style={{ width: '271px' }}>Select Range<br />
                                  <select 
                                    id="lstBoxSelect1_IncomeEstimatedHousehold" 
                                    style={{ height: '150px', width: '250px' }} 
                                    className="lstBoxSelect1" 
                                    multiple="multiple" 
                                    name="lstBoxSelect1_IncomeEstimatedHousehold"
                                  >
                                    {incomeOptions.map((option, index) => (
                                      !option.selected && (
                                        <option 
                                          key={option.value} 
                                          value={option.value}
                                          onClick={() => moveIncomeOption('right', index)}
                                        >
                                          {option.label}
                                        </option>
                                      )
                                    ))}
                                  </select>
                                </td>
                                
                                <td>Selected Range<br />
                                  <select 
                                    id="lstBoxSelected1_IncomeEstimatedHousehold" 
                                    style={{ height: '150px', width: '250px' }} 
                                    className="lstBoxSelected1" 
                                    multiple="multiple" 
                                    name="lstBoxSelected1_IncomeEstimatedHousehold"
                                  >
                                    {selectedIncome.map((option, index) => (
                                      <option 
                                        key={option.value} 
                                        value={option.value}
                                        onClick={() => moveIncomeOption('left', index)}
                                      >
                                        {option.label}
                                      </option>
                                    ))}
                                  </select>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              )}
            </li>

            {/* Individuals Section */}
            <li className="portlet ui-state-default">
  <div 
    className="portlet-header1 ui-widget-header2" 
    onClick={() => toggleSection('individuals')}
    style={{ marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer' }}
  >
    Individuals 
    <span 
      className={`glyphicon ${activeSections.individuals ? 'glyphicon-minus' : 'glyphicon-plus'}`} 
      style={{ float: 'right', marginRight: '5px' }}
    ></span>
    <div className="col-sm-3" style={{ float: 'right', width: '45%' }}>
      <a className="help-document" href="#" alt="Help" title="Help" onClick={() => DisplayHelpDialog('Individuals', '../TermsPDF/PDFFiles/Individuals.pdf')}>
      <span style={{ fontSize: 'x-small', verticalAlign: 'text-bottom' }}>
        View Data Dictionary
      </span>
      <span className="relative inline-block">
        <span 
          className="glyphicon glyphicon-question-sign cursor-help"
          onMouseEnter={() => handleDownload('Individuals.docx')}
          title="Download Individuals.docx"
        ></span>
      </span>
      </a>
    </div>
  </div>
  {activeSections.individuals && (
    <ul className="panel-collapse collapse" style={{ marginTop: '10px', height: 'auto', marginLeft: '12px', overflow: 'hidden', display: 'block' }}>
      <style dangerouslySetInnerHTML={{
        __html: `
          body {
            padding: 2em;
          }
          .panel-group {
            margin-right: 0;
            background-color: white;
            border-color: white;
          }
          .panel-group .list-group {
            margin-bottom: 0;
          }
          .panel-group .list-group .list-group-item {
            border-radius: 0;
            border-left: none;
            border-right: none;
          }
          .panel-group .list-group .list-group-item:last-child {
            border-bottom: none;
          }
          .panelheading-title {
            height: 20px;
            padding: 0;
            font-size: 11px;
            padding-left: 5px;
          }
          .small-textalign {
            padding-left: 5px;
          }
          .panel-body {
            padding: 4px !important;
          }
        `
      }} />
      
      {/* Gender Section */}
      <li>
        <div className="panel panel-default col-md-6" style={{ padding: 0 }}>
          <div className="panel-heading panelheading-title">Gender</div>
          <div className="panel-body" id="dvGender">
            <table id="tbl_Gender" cellSpacing="4" cellPadding="1">
              <tbody>
                <tr>
                  <td>
                    <span title="MALE">
                      <input 
                        id="chkBox_Male" 
                        type="checkbox" 
                        name="chkBox_Gender" 
                        value="M" 
                        checked={gender.male}
                        onChange={() => handleGenderChange('male')}
                        autoComplete="off"
                      />
                      <label htmlFor="chkBox_Male">Male</label>
                    </span>
                  </td>
                  <td>
                    <span title="FEMALE">
                      <input 
                        id="chkBox_Female" 
                        type="checkbox" 
                        name="chkBox_Gender" 
                        value="F" 
                        checked={gender.female}
                        onChange={() => handleGenderChange('female')}
                        autoComplete="off"
                      />
                      <label htmlFor="chkBox_Female">Female</label>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            {/* <div>
              <input 
                type="button" 
                id="btnSelectAll_Gender" 
                className="SelectAll" 
                value="SelectAll" 
                style={{ width: '88px', height: '28px', paddingTop: '2px' }}
                onClick={selectAllGender}
              />
              <input 
                type="button" 
                id="btnClearAll_Gender" 
                className="ClearAll" 
                value="ClearAll" 
                style={{ width: '88px', height: '28px', paddingTop: '2px' }}
                onClick={clearAllGender}
              />
            </div> */}
          </div>
        </div>
      </li>

      {/* Marital Status Section */}
      <li>
        <div className="panel panel-default col-md-6" style={{ padding: 0 }}>
          <div className="panel-heading panelheading-title">Marital Status</div>
          <div className="panel-body" align="center" id="dvMaritalStatus">
            <table id="tbl_MaritalStatus" cellSpacing="4" cellPadding="1">
              <tbody>
                <tr>
                  <td>
                    <span title="Married">
                      <input 
                        id="chkBox_Married" 
                        type="checkbox" 
                        name="chkBox_MaritalStatus" 
                        value="M" 
                        checked={maritalStatus.married}
                        onChange={() => handleMaritalStatusChange('married')}
                        autoComplete="off"
                      />
                      <label htmlFor="chkBox_Married">Married</label>
                    </span>
                  </td>
                  <td>
                    <span title="Single">
                      <input 
                        id="chkBox_Single" 
                        type="checkbox" 
                        name="chkBox_MaritalStatus" 
                        value="S" 
                        checked={maritalStatus.single}
                        onChange={() => handleMaritalStatusChange('single')}
                        autoComplete="off"
                      />
                      <label htmlFor="chkBox_Single">Single</label>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            {/* <div>
              <input 
                type="button" 
                id="btnSelectAll_MaritalStatus" 
                className="SelectAll" 
                value="SelectAll" 
                style={{ width: '88px', height: '28px', paddingTop: '2px' }}
                onClick={selectAllMaritalStatus}
              />
              <input 
                type="button" 
                id="btnClearAll_MaritalStatus" 
                className="ClearAll" 
                value="ClearAll" 
                style={{ width: '88px', height: '28px', paddingTop: '2px' }}
                onClick={clearAllMaritalStatus}
              />
            </div> */}
          </div>
        </div>
      </li>

      {/* Age Group Section */}
      <li>
        <div className="panel panel-default col-md-12" style={{ padding: 0 }}>
          <div className="panel-heading panelheading-title">Age Group</div>
          <div className="panel-body" align="center">
          <table align="center">
        <tbody>
          <tr>
            <td style={{ width: '271px' }}>
              <div className="mb-2 font-semibold">Select Range</div>
              <select
                id="lstBoxSelect1_AgeGroups"
                style={{ height: '150px', width: '250px' }}
                className="border border-gray-300 rounded p-1"
                multiple
                value={highlightedAvailable}
                onChange={handleAgeGroupSelectionChange}
              >
                {availableAgeGroups.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </td>
          
            <td>
              <div className="mb-2 font-semibold">Selected Age Range</div>
              <select
                id="lstBoxSelected1_AgeGroups"
                style={{ height: '150px', width: '250px' }}
                className="border border-gray-300 rounded p-1"
                multiple
                value={highlightedSelected}
                onChange={handleSelectedAgeGroupChange}
              >
                {selectedAgeGroups.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
          </div>
        </div>
      </li>

      {/* Credit Rating Section */}
      <li>
        <div className="panel panel-default col-md-12" style={{ padding: 0 }}>
          <div className="panel-heading panelheading-title">Credit Rating</div>
          <div className="panel-body">
            <div align="center">
            <table align="center">
        <tbody>
          <tr>
            <td style={{ width: '271px' }}>
              <div className="mb-2 font-semibold">Select Range</div>
              <select 
                id="lstBoxSelect1_CreditDetailsOnBasisOfCreditRating"
                style={{ height: '150px', width: '250px' }} 
                className="border border-gray-300 rounded p-1"
                multiple 
                value={highlightedAvailable}
                onChange={handleCreditRatingSelectionChange}
              >
                {availableCreditRatings.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </td>
           
            <td>
              <div className="mb-2 font-semibold">Selected Range</div>
              <select 
                id="lstBoxSelected1_CreditDetailsOnBasisOfCreditRating"
                style={{ height: '150px', width: '250px' }} 
                className="border border-gray-300 rounded p-1"
                multiple 
                value={highlightedSelected}
                onChange={handleSelectedCreditRatingChange}
              >
                {selectedCreditRatings.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        </tbody>
        </table>
            </div>
          </div>
        </div>
      </li>

      {/* Occupation Section */}
      <li>
        <div className="panel panel-default">
          <div className="panel-heading panelheading-title">Occupation / Description</div>
          <div className="panel-body" align="center">
            <div>
              Occupation / Description
              <input 
                id="OccupationAuto" 
                style={{ width: '50%' }} 
                value={occupationInput}
                onChange={(e) => {
                  setOccupationInput(e.target.value)
                  setState((prev)=>{
                    return{
                      ...prev,
                      occupation:e.target.value
                    }
                  })
                }}
              />
            
              <br />
            </div>
            Enter a list, separated by commas<br />
            <textarea 
              name="lstBoxSelected2_occupation" 
              id="occupation" 
              cols="75" 
              rows="8" 
              style={{ width: '75%', resize: 'none' }}
              value={occupationList}
              onChange={(e) => {
                setOccupationList(e.target.value)
                setState((prev)=>{
                  return{
                    ...prev,
                    occupation:e.target.value
                  }
                })
              }}
            />
          </div>
        </div>
      </li>

      {/* Ethnic Code Section */}
      <li>
        <div className="panel panel-default">
          <div className="panel-heading panelheading-title">Ethnic Code</div>
          <div className="panel-body" align="center">
            <div style={{ overflowX: 'auto' }}>
             <table align="center">
        <tbody>
          <tr>
            <td style={{ width: '271px' }}>
              <div className="mb-2 font-semibold">Select Range</div>
              <select 
                id="lstBoxSelect1_EthnicCity"
                style={{ height: '150px', width: '250px' }} 
                className="border border-gray-300 rounded p-1"
                multiple 
                value={highlightedAvailable}
                onChange={handleEthnicCodeSelectionChange}
              >
                {availableEthnicCodes.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </td>
            
            <td>
              <div className="mb-2 font-semibold">Selected Range</div>
              <select 
                id="lstBoxSelected1_EthnicCity"
                style={{ height: '150px', width: '250px' }} 
                className="border border-gray-300 rounded p-1"
                multiple 
                value={highlightedSelected}
                onChange={handleSelectedEthnicCodeChange}
              >
                {selectedEthnicCodes.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
            </div>
          </div>
        </div>
      </li>
    </ul>
  )}
</li>

            {/* Donor Affinity Section */}
            <li className="portlet ui-state-default">
  <div 
    className="portlet-header1 ui-widget-header2" 
    onClick={() => toggleSection('donorAffinity')}
    style={{ marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer' }}
  >
    Donor Affinity
    <span 
      className={`glyphicon ${activeSections.donorAffinity ? 'glyphicon-minus' : 'glyphicon-plus'}`} 
      style={{ float: 'right', marginRight: '5px' }}
    ></span>
    <div className="col-sm-3" style={{ float: 'right', width: '45%' }}>
      <a 
        className="help-document" 
        href="#" 
        alt="Help" 
        title="Help" 
        onClick={(e) => {
          e.preventDefault();
          DisplayHelpDialog('Donor Affinity', '../TermsPDF/PDFFiles/Donor Affinity.pdf');
        }}
      >
        <span style={{ fontSize: 'x-small', verticalAlign: 'text-bottom' }}>View Data Dictionary</span>
       
      <span 
        className="glyphicon glyphicon-question-sign cursor-help"
        onMouseEnter={() => handleDownload('Donor Affinity Data Dictionary.docx')}
        title="Download Donor Affinity Data Dictionary.docx">
      </span>
      </a>
    </div>
  </div>
  
  {activeSections.donorAffinity && (
    <ul className="panel-collapse collapse" style={{ marginTop: '10px', marginLeft: '12px', overflow: 'hidden', display: 'block' }}>
      <li>
      <td style={{ verticalAlign: 'top' }}>

</td>
        <div className="panel-body" style={{ paddingTop: '0px !important' }}>
          <div>
            <table>
              <tbody>
                <tr>
                  <td style={{ paddingBottom: '4%' }}>
                    <b>Propensity to Give</b>
                  </td>
                  <td>
                    <div className="panel-body" style={{ margin: '5px 5px 5px 10px', padding: '5px 5px 5px 10px', textAlign: 'center' }} id="dvDonor" data-title="Propensity to Give">
                      <span title="Not Likely" style={{ display: 'none' }}>
                        <input 
                          id="chkBox_DonorNotLikely" 
                          type="checkbox" 
                          name="chkBox_DonorNotLikely" 
                          value="0" 
                          autoComplete="off"
                          checked={donorAffinity.notLikely}
                          onChange={() => handleDonorAffinityChange('notLikely')}
                        />
                        <label htmlFor="chkBox_DonorNotLikely">Unknown</label>
                      </span>
                      <span title="Likely">
                        <input 
                          id="chkBox_DonorLikely" 
                          type="checkbox" 
                          name="chkBox_DonorLikely" 
                          value="1-70" 
                          autoComplete="off"
                          checked={donorAffinity.likely}
                          onChange={() => handleDonorSelectBoxAffinityChange('likely')}
                        />
                        <label htmlFor="chkBox_DonorLikely">LIKELY</label>
                      </span>
                      <span title="VeryLikely">
                        <input 
                          id="chkBox_DonorVeryLikely" 
                          type="checkbox" 
                          name="chkBox_DonorVeryLikely" 
                          value="71-100" 
                          autoComplete="off"
                          checked={donorAffinity.veryLikely}
                          onChange={() => handleDonorSelectBoxAffinityChange('veryLikely')}
                        />
                        <label htmlFor="chkBox_DonorVeryLikely">VERY LIKELY</label>
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <table align="center">
        <tbody>
          <tr>
            <td style={{ width: '271px' }}>
              <div className="mb-2 font-semibold">Select Range</div>
              <select 
                id="lstBoxSelect1_Charity"
                style={{ height: '150px', width: '250px' }} 
                className="border border-gray-300 rounded p-1"
                multiple={true}
                name="lstBoxSelect1_Charity"
                value={leftCharityHighlighted}
                onChange={handleCharitySelectionChange}
              >
                {availableCharityOptions.map(option => (
  <option key={option} value={option}>
    {availableCharityLabels[option]}
  </option>
))}

              </select>
            </td>
           
            <td>
              <div className="mb-2 font-semibold">Selected Range</div>
              <select 
                id="lstBoxSelected1_Charity"
                style={{ height: '150px', width: '250px' }} 
                className="border border-gray-300 rounded p-1"
                multiple={true}
                name="lstBoxSelected1_Charity"
                value={rightCharityHighlighted}
                onChange={handleSelectedCharityChange}
              >
                {selectedCharityOptions.map(option => (
  <option key={option} value={option}>
    {availableCharityLabels[option]}
  </option>
))}

              </select>
            </td>
          </tr>
        </tbody>
      </table>
        </div>
      </li>
      
    </ul>
  )}
</li>

            {/* Other sections would follow the same pattern */}
            {/* Turning 65, Pet, Propensity, Life Style, Outdoor, Sports & Fitness, Travel & Hobbies, Genre:Books/Magazines/Web TV */}
            <li className="portlet ui-state-default">
  <div 
    className="portlet-header1 ui-widget-header2" 
    onClick={() => toggleSection('turning65')}
    style={{ marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer' }}
  >
    Turning 65
    <span 
      className={`glyphicon ${activeSections.turning65 ? 'glyphicon-minus' : 'glyphicon-plus'}`} 
      style={{ float: 'right', marginRight: '5px' }}
    ></span>
    <div className="col-sm-3" style={{ float: 'right', width: '45%' }}>
      <a 
        className="help-document" 
        href="#" 
        alt="Help" 
        title="Help" 
        onClick={(e) => {
          e.preventDefault();
          DisplayHelpDialog('Turning 65', '../TermsPDF/PDFFiles/Turning 65.pdf');
        }}
      >
        <span style={{ fontSize: 'x-small', verticalAlign: 'text-bottom' }}>View Data Dictionary</span>
        <span 
        className="glyphicon glyphicon-question-sign cursor-help"
        onMouseEnter={() => handleDownload('Turning 65 Data.docx')}
        title="Download Turning 65 Data.docx">
      </span>

      </a>
    </div>
  </div>

  {activeSections.turning65 && (
    <ul className="panel-collapse collapse" style={{ marginLeft: '12px', marginTop: '5px', overflow: 'hidden', display: 'block' }}>
      <li>
        <div className="panel-body" style={{ paddingTop: '0px !important' }}>
        <table align="center">
        <tbody>
          <tr>
            <td style={{ width: '271px' }}>
              <div className="mb-2 font-semibold">Select Months Range</div>
              <select 
                id="lstBoxSelect1_Turning65List"
                style={{ height: '150px', width: '250px' }} 
                className="border border-gray-300 rounded p-1"
                multiple 
                value={leftHighlighted}
                onChange={handleLeftSelectionChange}
              >
                {availableOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </td>
            
            <td>
              <div className="mb-2 font-semibold">Selected Range</div>
              <select 
                id="lstBoxSelected1_Turning65List"
                style={{ height: '150px', width: '250px' }} 
                className="border border-gray-300 rounded p-1"
                multiple 
                value={rightHighlighted}
                onChange={handleRightSelectionChange}
              >
                {selectedOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      
        </div>
      </li>
    </ul>
  )}
</li>
          </ul>



          <li className="portlet ui-state-default">
  <div 
    className="portlet-header1 ui-widget-header2" 
    onClick={() => toggleSection('pet')}
    style={{ marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer' }}
  >
    Pet
    <span 
      className={`glyphicon ${activeSections.pet ? 'glyphicon-minus' : 'glyphicon-plus'}`} 
      style={{ float: 'right', marginRight: '5px' }}
    ></span>
    <div className="col-sm-3" style={{ float: 'right', width: '45%' }}>
      <a 
        className="help-document" 
        href="#" 
        alt="Help" 
        title="Help" 
        onClick={(e) => {
          e.preventDefault();
          DisplayHelpDialog('Pets', '../TermsPDF/PDFFiles/Pets.pdf');
        }}
      >
        <span style={{ fontSize: 'x-small', verticalAlign: 'text-bottom' }}>View Data Dictionary</span>
        <span 
        className="glyphicon glyphicon-question-sign cursor-help"
        onMouseEnter={() => handleDownload('Pets.docx')}
        title="Download Pets.docx">
      </span>
      </a>
    </div>
  </div>

  {activeSections.pet && (
    <ul className="panel-collapse collapse" role="tabpanel" style={{ marginLeft: '12px', marginTop: '5px', overflow: 'hidden', display: 'block' }}>
      <li>
        <div className="panel-body" style={{ paddingTop: '0px !important' }}>
        <td style={{ verticalAlign: 'top' }}>
  <table>
    <tbody>
      
    </tbody>
  </table>
</td>
<table align="center">
        <tbody>
          <tr>
            <td style={{ width: '271px' }}>
              <div className="mb-2 font-semibold">Select Range</div>
              <select 
                id="lstBoxSelect1_Pets"
                style={{ height: '150px', width: '250px' }} 
                className="border border-gray-300 rounded p-1"
                multiple 
                value={leftPetCategoryHighlighted}
                onChange={handlePetCategorySelectionChange}
              >
                {availablePetCategoryOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </td>
           
            <td>
              <div className="mb-2 font-semibold">Selected Range</div>
              <select 
                id="lstBoxSelected1_Pets"
                style={{ height: '150px', width: '250px' }} 
                className="border border-gray-300 rounded p-1"
                multiple 
                value={rightPetCategoryHighlighted}
                onChange={handleSelectedPetCategoryChange}
              >
                {selectedPetCategoryOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      
        </div>
      </li>
    </ul>
  )}
</li>


<li className="portlet ui-state-default">
  <div 
    className="portlet-header1 ui-widget-header2" 
    onClick={() => toggleSection('propensity')}
    style={{ marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer' }}
  >
    Propensity
    <span 
      className={`glyphicon ${activeSections.propensity ? 'glyphicon-minus' : 'glyphicon-plus'}`} 
      style={{ float: 'right', marginRight: '5px' }}
    ></span>
    <div className="col-sm-3" style={{ float: 'right', width: '45%' }}>
      <a 
        className="help-document" 
        href="#" 
        alt="Help" 
        title="Help" 
        onClick={(e) => {
          e.preventDefault();
          DisplayHelpDialog('Propensity', '../TermsPDF/PDFFiles/Propensity Dictionary.pdf');
        }}
      >
        <span style={{ fontSize: 'x-small', verticalAlign: 'text-bottom' }}>View Data Dictionary</span>
        <span 
        className="glyphicon glyphicon-question-sign cursor-help"
        onMouseEnter={() => handleDownload('Propensity.docx')}
        title="Download Propensity.docx">
      </span>
      </a>
    </div>
  </div>

  {activeSections.propensity && (
  <ul className="panel-collapse collapse" style={{ marginTop: '10px', height: 'auto', marginLeft: '12px', overflow: 'hidden', display: 'block' }}>
    <li>
      <div className="panel panel-default col-md-12" style={{ padding: '0' }}>
        <div className="panel-heading panelheading-title">Propensity</div>
        <div className="panel-body">
        <td style={{ verticalAlign: 'top' }}>
  <table>
    <tbody>
      
    </tbody>
  </table>
</td>
<table align="center" className="border-collapse">
        <tbody>
          <tr>
            <td style={{ width: '271px', verticalAlign: 'top' }}>
              <div className="mb-2 font-semibold">Select Range</div>
              <select 
                id="lstBoxSelect1_IncomeEstimatedHousehold" 
                style={{ height: '150px', width: '250px' }} 
                className="border border-gray-300 rounded p-1" 
                multiple={true}
                name="lstBoxSelect1_IncomeEstimatedHousehold"
                value={selectedFromAvailable}
                onChange={handleAvailableSelectionChange}
              >
                {currentAvailableOptions.map((option) => (
                  <option 
                    key={option.value} 
                    value={option.value}
                    className="p-1"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </td>
           
            <td style={{ verticalAlign: 'top' }}>
              <div className="mb-2 font-semibold">Selected Range</div>
              <select 
                id="lstBoxSelected1_IncomeEstimatedHousehold" 
                style={{ height: '150px', width: '250px' }} 
                className="border border-gray-300 rounded p-1" 
                multiple={true}
                name="lstBoxSelected1_IncomeEstimatedHousehold"
                value={selectedFromSelected}
                onChange={handleSelectedSelectionChange}
              >
                {selectedPropensityOptions.map((option) => (
                  <option 
                    key={option.value} 
                    value={option.value}
                    className="p-1"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
        </div>
      </div>
    </li>
  </ul>
)}
</li>

<li className="portlet ui-state-default">
  <div 
    className="portlet-header1 ui-widget-header2" 
    onClick={() => toggleSection('outdoor')}
    style={{ marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer' }}
  >
    Outdoor
    <span 
      className={`glyphicon ${activeSections.outdoor ? 'glyphicon-minus' : 'glyphicon-plus'}`} 
      style={{ float: 'right', marginRight: '5px' }}
    ></span>
    <div className="col-sm-3" style={{ float: 'right', width: '45%' }}>
      <a 
        className="help-document" 
        href="#" 
        alt="Help" 
        title="Help" 
        onClick={(e) => {
          e.preventDefault();
          DisplayHelpDialog('Outdoor', '../TermsPDF/PDFFiles/Outdoor.pdf');
        }}
      >
        <span style={{ fontSize: 'x-small', verticalAlign: 'text-bottom' }}>View Data Dictionary</span>
       
        <span 
        className="glyphicon glyphicon-question-sign cursor-help"
        onMouseEnter={() => handleDownload('Outdoor.docx')}
        title="Download Outdoor.docx">
      </span>
      </a>
    </div>
  </div>

  {activeSections.outdoor && (
  <ul className="panel-collapse collapse" style={{ marginTop: '10px', height: 'auto', marginLeft: '12px', overflow: 'hidden', display: 'block' }}>
    <li>
      <div className="panel panel-default col-md-12" style={{ padding: '0' }}>
        <div className="panel-heading panelheading-title">Outdoor Interests</div>
      
        <div className="panel-body">
        <td style={{ verticalAlign: 'top' }}>
  <table>
    <tbody>
      
    </tbody>
  </table>
</td>
          <div align="center">
          <table align="center">
        <tbody>
          <tr>
            <td style={{ width: '271px' }}>
              <div className="mb-2 font-semibold">Select Range</div>
              <select
                id="lstBoxSelect1_ConsumerOutdoor"
                style={{ height: '150px', width: '250px' }}
                className="border border-gray-300 rounded p-1"
                multiple
                value={highlightedAvailable}
                onChange={handleOutdoorSelectionChange}
              >
                {availableOutdoorOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </td>
            
            <td>
              <div className="mb-2 font-semibold">Selected Range</div>
              <select
                id="lstBoxSelected1_ConsumerOutdoor"
                style={{ height: '150px', width: '250px' }}
                className="border border-gray-300 rounded p-1"
                multiple
                value={highlightedSelected}
                onChange={handleSelectedOutdoorChange}
              >
                {selectedOutdoorOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
          </div>
        </div>
      </div>
    </li>
  </ul>
)}
</li>

<li className="portlet ui-state-default">
  <div 
    className="portlet-header1 ui-widget-header2" 
    onClick={() => toggleSection('sportsFitness')}
    style={{ marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer' }}
  >
    Sports &amp; Fitness
    <span 
      className={`glyphicon ${activeSections.sportsFitness ? 'glyphicon-minus' : 'glyphicon-plus'}`} 
      style={{ float: 'right', marginRight: '5px' }}
    ></span>
    <div className="col-sm-3" style={{ float: 'right', width: '45%' }}>
      <a 
        className="help-document" 
        href="#" 
        alt="Help" 
        title="Help" 
        onClick={(e) => {
          e.preventDefault();
          DisplayHelpDialog('Sports & Fitness', '../TermsPDF/PDFFiles/Sports Fitness.pdf');
        }}
      >
        <span style={{ fontSize: 'x-small', verticalAlign: 'text-bottom' }}>View Data Dictionary</span>
        <span 
        className="glyphicon glyphicon-question-sign cursor-help"
        onMouseEnter={() => handleDownload('Sports Fitness.docx')}
        title="Download Sports Fitness.docx">
      </span>
      </a>
    </div>
  </div>

  {activeSections.sportsFitness && (
  <ul className="panel-collapse collapse" style={{ marginTop: '10px', height: 'auto', marginLeft: '12px', overflow: 'hidden', display: 'block' }}>
    <li>
      <div className="panel panel-default col-md-12" style={{ padding: '0' }}>
        <div className="panel-heading panelheading-title">Sports & Fitness</div>
        <div className="panel-body">
        <td style={{ verticalAlign: 'top' }}>
  <table>
    <tbody>
     
    </tbody>
  </table>
</td>
          <div align="center">
          <table align="center">
        <tbody>
          <tr>
            <td style={{ width: '271px' }}>
              <div className="mb-2 font-semibold">Select Range</div>
              <select
                id="lstBoxSelect1_ConsumerSportsFitness"
                style={{ height: '150px', width: '250px' }}
                className="border border-gray-300 rounded p-1"
                multiple
                value={highlightedAvailable}
                onChange={handleSportsFitnessSelectionChange}
              >
                {availableSportsFitnessOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </td>
            
            <td>
              <div className="mb-2 font-semibold">Selected Range</div>
              <select
                id="lstBoxSelected1_ConsumerSportsFitness"
                style={{ height: '150px', width: '250px' }}
                className="border border-gray-300 rounded p-1"
                multiple
                value={highlightedSelected}
                onChange={handleSelectedSportsFitnessChange}
              >
                {selectedSportsFitnessOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
          </div>
        </div>
      </div>
    </li>
  </ul>
)}
</li>

<li className="portlet ui-state-default">
  <div 
    className="portlet-header1 ui-widget-header2" 
    onClick={() => toggleSection('travelHobbies')}
    style={{ marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer' }}
  >
    Travel &amp; Hobbies
    <span 
      className={`glyphicon ${activeSections.travelHobbies ? 'glyphicon-minus' : 'glyphicon-plus'}`} 
      style={{ float: 'right', marginRight: '5px' }}
    ></span>
    <div className="col-sm-3" style={{ float: 'right', width: '45%' }}>
      <a 
        className="help-document" 
        href="#" 
        alt="Help" 
        title="Help" 
        onClick={(e) => {
          e.preventDefault();
          DisplayHelpDialog('Travel & Hobbies', '../TermsPDF/PDFFiles/Travel Hobbies.pdf');
        }}
      >
        <span style={{ fontSize: 'x-small', verticalAlign: 'text-bottom' }}>View Data Dictionary</span>
        <span 
        className="glyphicon glyphicon-question-sign cursor-help"
        onMouseEnter={() => handleDownload('Travel Hobbies.docx')}
        title="Download Travel Hobbies.docx">
      </span>
      </a>
    </div>
  </div>

  {activeSections.travelHobbies && (
  <ul className="panel-collapse collapse" style={{ marginTop: '10px', height: 'auto', marginLeft: '12px', overflow: 'hidden', display: 'block' }}>
    <li>
      <div className="panel panel-default col-md-12" style={{ padding: '0' }}>
        <div className="panel-heading panelheading-title">Travel & Hobbies</div>
        <div className="panel-body">
        <td style={{ verticalAlign: 'top' }}>
  <table>
    <tbody>
     
    </tbody>
  </table>
</td>
          <div align="center">
            <table align="center">
            <table align="center">
        <tbody>
          <tr>
            <td style={{ width: '271px' }}>
              <div className="mb-2 font-semibold">Select Range</div>
              <select
                id="lstBoxSelect1_ConsumerTravelHobbies"
                style={{ height: '150px', width: '250px' }}
                className="border border-gray-300 rounded p-1"
                multiple
                value={highlightedAvailable}
                onChange={handleTravelHobbiesSelectionChange}
              >
                {availableTravelHobbiesOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </td>
            
            <td>
              <div className="mb-2 font-semibold">Selected Range</div>
              <select
                id="lstBoxSelected1_ConsumerTravelHobbies"
                style={{ height: '150px', width: '250px' }}
                className="border border-gray-300 rounded p-1"
                multiple
                value={highlightedSelected}
                onChange={handleSelectedTravelHobbiesChange}
              >
                {selectedTravelHobbiesOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
            </table>
          </div>
        </div>
      </div>
    </li>
  </ul>
)}
</li>


<li className="portlet ui-state-default">
  <div 
    className="portlet-header1 ui-widget-header2" 
    onClick={() => toggleSection('genreBooks')}
    style={{ marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer' }}
  >
    Genre:Books/Magazines/Web TV
    <span 
      className={`glyphicon ${activeSections.genreBooks ? 'glyphicon-minus' : 'glyphicon-plus'}`} 
      style={{ float: 'right', marginRight: '5px' }}
    ></span>
    <div className="col-sm-3" style={{ float: 'right', width: '45%' }}>
      <a 
        className="help-document" 
        href="#" 
        alt="Help" 
        title="Help" 
        onClick={(e) => {
          e.preventDefault();
          DisplayHelpDialog('Genre:Books/Magazines/Web TV', '../TermsPDF/PDFFiles/Genre Books Magazines Web TV.pdf');
        }}
      >
        <span style={{ fontSize: 'x-small', verticalAlign: 'text-bottom' }}>View Data Dictionary</span>
        <span 
        className="glyphicon glyphicon-question-sign cursor-help"
        onMouseEnter={() => handleDownload('Genre Books Magazines Web TV.docx')}
        title="Download Genre Books Magazines Web TV.docx">
      </span>
      </a>
    </div>

  

  </div>
 
  {activeSections.genreBooks && (
  <ul className="panel-collapse collapse" style={{ marginTop: '10px', height: 'auto', marginLeft: '12px', overflow: 'hidden', display: 'block' }}>
    <li>
      <div className="panel panel-default col-md-12" style={{ padding: '0' }}>
        <div className="panel-heading panelheading-title">Genre: Books/Magazines/Web TV</div>
        <div className="panel-body">
        <td style={{ verticalAlign: 'top' }}>
  <table>
    <tbody>
      
    </tbody>
  </table>
</td>
          <div align="center">
          <table align="center">
        <tbody>
          <tr>
            <td style={{ width: '271px' }}>
              <div className="mb-2 font-semibold">Select Range</div>
              <select
                id="lstBoxSelect1_ConsumerGenres"
                style={{ height: '150px', width: '250px' }}
                className="border border-gray-300 rounded p-1"
                multiple
                value={highlightedAvailable}
                onChange={handleGenreBooksSelectionChange}
              >
                {availableGenreBooksOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </td>
        
            <td>
              <div className="mb-2 font-semibold">Selected Range</div>
              <select
                id="lstBoxSelected1_ConsumerGenres"
                style={{ height: '150px', width: '250px' }}
                className="border border-gray-300 rounded p-1"
                multiple
                value={highlightedSelected}
                onChange={handleSelectedGenreBooksChange}
              >
                {selectedGenreBooksOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
          </div>
        </div>
      </div>
    </li>
  </ul>
)}
</li>
<div className="row">
    <button 
    onClick={()=>{
      setActiveTab('supression')
    }}
                className="primary-button" 
               
              >
              Submit request
              </button>
          </div>
        </div>
        
        <div className="col-md-3 col-sm-3">
      
          <div className="row">
            <div className="col-md-10">
              {/* <label><b><u>Campaign Type : </u></b></label> */}
              {/* <label className="DemolblCampaignType" style={{ display: 'inline' }}>Mailing List + Phone</label>
              <div className="campaign-type-details"></div> */}
              {/* <div className="dvPropertyType" style={{ display: 'none' }}>
                <label><b><u>Property Type : </u></b></label>
                <label className="lblPropType"></label>
              </div> */}
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-10">
              <div className="GeoContent"></div>
            </div>
          </div>
{/*           
          <div className="row">
            <div className="col-md-10">
              <label><b><i>Demographics: </i></b></label>
              <br />
              <div className="DemoContent">
                <div id="IncomeEstimatedHousehold_Id">
                  <label id="IdIncomeEstimatedHousehold1" style={{ paddingRight: '1%' }}>
                    <b>HH Income - Inferred: </b>
                  </label>
                  <label id="IdIncomeEstimatedHousehold">$10,000 - $14,999</label>
                </div>
              </div>
            </div>
          </div> */}
          
          <div className="row">
            <div className="col-md-12">
              <div className="DemoControls" id="demoControlsId" style={{ width: '100%', display: 'block' }}>
                <div className="row">
                  <div className="col-md-12">
                    {/* <input 
                      type="text" 
                      name="CountName2" 
                      id="CountName2" 
                      className="k-textbox" 
                      placeholder="Save Name" 
                      style={{ marginTop: '4px', width: '100%' }} 
                    /> */}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-8">
                    {/* <input 
                      type="button" 
                      name="Save" 
                      value="Save" 
                      className="" 
                      id="btnSave2" 
                      style={{ 
                        textDecoration: 'none', 
                        padding: '10%', 
                        backgroundColor: 'rgb(255,107,1)', 
                        color: 'white', 
                        fontWeight: 'bold', 
                        borderRadius: '5px', 
                        display: 'block', 
                        textAlign: 'center', 
                        fontSize: 'medium', 
                        width: '100%' 
                      }} 
                    /> */}
                  </div>
                  {/* <div className="col-md-8">
                    <input 
                      type="button" 
                      name="Save" 
                      value="View Saved Count" 
                      className="btn-view-savecount" 
                      style={{ 
                        textDecoration: 'none', 
                        padding: '6%', 
                        backgroundColor: 'rgb(255,107,1)', 
                        color: 'white', 
                        fontWeight: 'bold', 
                        borderRadius: '5px', 
                        display: 'block', 
                        textAlign: 'center', 
                        fontSize: 'small', 
                        width: '100%' 
                      }} 
                    />
                  </div> */}
                </div>
              </div>
            </div>
          </div>
{/*           
          <div className="row">
            <div className="col-md-12" style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '1%' }}>
              <div>
                <a href="#" id="GenericLink" style={{}}>Generic Sample </a>
                <img 
                  title="General sample showing fields available after purchase" 
                  src="/Content/Images/Help.png" 
                  style={{ height: '30px', width: '30px' }} 
                />
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
</div>
</div>
</div>


  );
};




const DisplayHelpDialog = (title, path) => {
 
};

const ShowDialog = (show, dialogId) => {

};



const Geography = () => {
  const [activeTab, setActiveTab] = useState('geography');
  const {state,setState}=useContext(ConsumerContext)
  
 
  const [formData, setFormData] = useState({
    zipCodes: '',
    centerZip: '',
    radiusMiles: '',
    cityState: '',
    metroState: '',
    countyState: '',
    configName: '',
    selectAllStates: false,
    states: [],
    fileStatus: ''
  });


  const [selectedItems, setSelectedItems] = useState({
    cities: [],
    metros: [],
    counties: []
  });

 
  const [availableItems, setAvailableItems] = useState({
    cities: [],
    metros: [],
    counties: []
  });

  const [expandedSections, setExpandedSections] = useState({
    zipcodes: true,
    city: false,
    metro: false,
    county: false,
    state: true
  });


  const stateData = {
    'AK': {
      cities: ['Anchorage', 'Fairbanks', 'Juneau', 'Sitka', 'Ketchikan'],
      metros: ['Anchorage', 'Fairbanks'],
      counties: ['Anchorage Municipality', 'Fairbanks North Star Borough', 'Juneau City and Borough', 'Matanuska-Susitna Borough', 'Kenai Peninsula Borough']
    },
    'AL': {
      cities: ['Birmingham', 'Montgomery', 'Mobile', 'Huntsville', 'Tuscaloosa'],
      metros: ['Birmingham-Hoover', 'Mobile', 'Huntsville', 'Montgomery'],
      counties: ['Jefferson County', 'Mobile County', 'Madison County', 'Montgomery County', 'Tuscaloosa County']
    },
    'AR': {
      cities: ['Little Rock', 'Fort Smith', 'Fayetteville', 'Springdale', 'Jonesboro'],
      metros: ['Little Rock-North Little Rock-Conway', 'Fort Smith', 'Fayetteville-Springdale-Rogers'],
      counties: ['Pulaski County', 'Washington County', 'Sebastian County', 'Benton County', 'Craighead County']
    },
    'AZ': {
      cities: ['Phoenix', 'Tucson', 'Mesa', 'Chandler', 'Scottsdale'],
      metros: ['Phoenix-Mesa-Chandler', 'Tucson', 'Flagstaff'],
      counties: ['Maricopa County', 'Pima County', 'Pinal County', 'Yavapai County', 'Mohave County']
    },
    'CA': {
      cities: ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento', 'Oakland', 'San Jose', 'Fresno', 'Long Beach', 'Santa Ana', 'Anaheim'],
      metros: ['Los Angeles-Long Beach-Anaheim', 'San Francisco-Oakland-Berkeley', 'San Diego-Chula Vista-Carlsbad', 'Sacramento-Roseville-Folsom', 'San Jose-Sunnyvale-Santa Clara'],
      counties: ['Los Angeles County', 'San Francisco County', 'San Diego County', 'Orange County', 'Sacramento County', 'Santa Clara County', 'Alameda County', 'Riverside County', 'Fresno County', 'Kern County']
    },
    'CO': {
      cities: ['Denver', 'Colorado Springs', 'Aurora', 'Fort Collins', 'Lakewood'],
      metros: ['Denver-Aurora-Lakewood', 'Colorado Springs', 'Fort Collins', 'Boulder'],
      counties: ['Denver County', 'El Paso County', 'Jefferson County', 'Arapahoe County', 'Adams County']
    },
    'CT': {
      cities: ['Bridgeport', 'New Haven', 'Hartford', 'Stamford', 'Waterbury'],
      metros: ['Hartford-East Hartford-Middletown', 'New Haven-Milford', 'Bridgeport-Stamford-Norwalk'],
      counties: ['Fairfield County', 'Hartford County', 'New Haven County', 'New London County', 'Litchfield County']
    },
    'DC': {
      cities: ['Washington'],
      metros: ['Washington-Arlington-Alexandria'],
      counties: ['District of Columbia']
    },
    'DE': {
      cities: ['Wilmington', 'Dover', 'Newark', 'Middletown', 'Smyrna'],
      metros: ['Philadelphia-Camden-Wilmington', 'Dover'],
      counties: ['New Castle County', 'Kent County', 'Sussex County']
    },
    'FL': {
      cities: ['Jacksonville', 'Miami', 'Tampa', 'Orlando', 'St. Petersburg', 'Hialeah', 'Tallahassee', 'Fort Lauderdale', 'Port St. Lucie', 'Cape Coral'],
      metros: ['Miami-Fort Lauderdale-Pompano Beach', 'Tampa-St. Petersburg-Clearwater', 'Orlando-Kissimmee-Sanford', 'Jacksonville'],
      counties: ['Miami-Dade County', 'Broward County', 'Palm Beach County', 'Hillsborough County', 'Orange County', 'Pinellas County', 'Duval County', 'Lee County', 'Polk County', 'Brevard County']
    },
    'GA': {
      cities: ['Atlanta', 'Augusta', 'Columbus', 'Macon', 'Savannah'],
      metros: ['Atlanta-Sandy Springs-Alpharetta', 'Augusta-Richmond County', 'Columbus', 'Savannah'],
      counties: ['Fulton County', 'Gwinnett County', 'Cobb County', 'DeKalb County', 'Clayton County']
    },
    'HI': {
      cities: ['Honolulu', 'Pearl City', 'Hilo', 'Kailua', 'Waipahu'],
      metros: ['Urban Honolulu', 'Kahului-Wailuku-Lahaina'],
      counties: ['Honolulu County', 'Hawaii County', 'Maui County', 'Kauai County']
    },
    'IA': {
      cities: ['Des Moines', 'Cedar Rapids', 'Davenport', 'Sioux City', 'Waterloo'],
      metros: ['Des Moines-West Des Moines', 'Cedar Rapids', 'Davenport-Moline-Rock Island'],
      counties: ['Polk County', 'Linn County', 'Scott County', 'Johnson County', 'Black Hawk County']
    },
    'ID': {
      cities: ['Boise', 'Meridian', 'Nampa', 'Idaho Falls', 'Pocatello'],
      metros: ['Boise City', 'Coeur d\'Alene', 'Idaho Falls', 'Pocatello'],
      counties: ['Ada County', 'Canyon County', 'Kootenai County', 'Bonneville County', 'Bannock County']
    },
    'IL': {
      cities: ['Chicago', 'Aurora', 'Rockford', 'Joliet', 'Naperville'],
      metros: ['Chicago-Naperville-Elgin', 'Rockford', 'Peoria', 'Champaign-Urbana'],
      counties: ['Cook County', 'DuPage County', 'Lake County', 'Kane County', 'Will County']
    },
    'IN': {
      cities: ['Indianapolis', 'Fort Wayne', 'Evansville', 'South Bend', 'Carmel'],
      metros: ['Indianapolis-Carmel-Anderson', 'Fort Wayne', 'Evansville', 'South Bend-Mishawaka'],
      counties: ['Marion County', 'Lake County', 'Allen County', 'Hamilton County', 'St. Joseph County']
    },
    'KS': {
      cities: ['Wichita', 'Overland Park', 'Kansas City', 'Topeka', 'Olathe'],
      metros: ['Wichita', 'Kansas City', 'Topeka', 'Lawrence'],
      counties: ['Johnson County', 'Sedgwick County', 'Shawnee County', 'Wyandotte County', 'Douglas County']
    },
    'KY': {
      cities: ['Louisville', 'Lexington', 'Bowling Green', 'Owensboro', 'Covington'],
      metros: ['Louisville/Jefferson County', 'Lexington-Fayette', 'Bowling Green', 'Owensboro'],
      counties: ['Jefferson County', 'Fayette County', 'Kenton County', 'Boone County', 'Warren County']
    },
    'LA': {
      cities: ['New Orleans', 'Baton Rouge', 'Shreveport', 'Metairie', 'Lafayette'],
      metros: ['New Orleans-Metairie', 'Baton Rouge', 'Shreveport-Bossier City', 'Lafayette'],
      counties: ['Orleans Parish', 'Jefferson Parish', 'East Baton Rouge Parish', 'Caddo Parish', 'Lafayette Parish']
    },
    'MA': {
      cities: ['Boston', 'Worcester', 'Springfield', 'Cambridge', 'Lowell'],
      metros: ['Boston-Cambridge-Newton', 'Worcester', 'Springfield'],
      counties: ['Middlesex County', 'Worcester County', 'Essex County', 'Norfolk County', 'Plymouth County']
    },
    'MD': {
      cities: ['Baltimore', 'Columbia', 'Germantown', 'Silver Spring', 'Waldorf'],
      metros: ['Baltimore-Columbia-Towson', 'Washington-Arlington-Alexandria', 'Salisbury'],
      counties: ['Montgomery County', 'Prince George\'s County', 'Baltimore County', 'Anne Arundel County', 'Howard County']
    },
    'ME': {
      cities: ['Portland', 'Lewiston', 'Bangor', 'South Portland', 'Auburn'],
      metros: ['Portland-South Portland', 'Lewiston-Auburn', 'Bangor'],
      counties: ['Cumberland County', 'York County', 'Penobscot County', 'Kennebec County', 'Androscoggin County']
    },
    'MI': {
      cities: ['Detroit', 'Grand Rapids', 'Warren', 'Sterling Heights', 'Lansing'],
      metros: ['Detroit-Warren-Dearborn', 'Grand Rapids-Wyoming', 'Flint', 'Lansing-East Lansing'],
      counties: ['Wayne County', 'Oakland County', 'Macomb County', 'Kent County', 'Genesee County']
    },
    'MN': {
      cities: ['Minneapolis', 'Saint Paul', 'Rochester', 'Duluth', 'Bloomington'],
      metros: ['Minneapolis-St. Paul-Bloomington', 'Duluth', 'Rochester', 'St. Cloud'],
      counties: ['Hennepin County', 'Ramsey County', 'Dakota County', 'Anoka County', 'Washington County']
    },
    'MO': {
      cities: ['Kansas City', 'St. Louis', 'Springfield', 'Independence', 'Columbia'],
      metros: ['St. Louis', 'Kansas City', 'Springfield', 'Columbia'],
      counties: ['St. Louis County', 'Jackson County', 'St. Charles County', 'Jefferson County', 'Clay County']
    },
    'MS': {
      cities: ['Jackson', 'Gulfport', 'Southaven', 'Hattiesburg', 'Biloxi'],
      metros: ['Jackson', 'Gulfport-Biloxi', 'Hattiesburg'],
      counties: ['Hinds County', 'Harrison County', 'DeSoto County', 'Jackson County', 'Madison County']
    },
    'MT': {
      cities: ['Billings', 'Missoula', 'Great Falls', 'Bozeman', 'Butte'],
      metros: ['Billings', 'Missoula', 'Great Falls'],
      counties: ['Yellowstone County', 'Missoula County', 'Gallatin County', 'Flathead County', 'Cascade County']
    },
    'NC': {
      cities: ['Charlotte', 'Raleigh', 'Greensboro', 'Durham', 'Winston-Salem'],
      metros: ['Charlotte-Concord-Gastonia', 'Raleigh-Cary', 'Greensboro-High Point', 'Durham-Chapel Hill'],
      counties: ['Mecklenburg County', 'Wake County', 'Guilford County', 'Forsyth County', 'Cumberland County']
    },
    'ND': {
      cities: ['Fargo', 'Bismarck', 'Grand Forks', 'Minot', 'West Fargo'],
      metros: ['Fargo', 'Bismarck', 'Grand Forks'],
      counties: ['Cass County', 'Burleigh County', 'Grand Forks County', 'Ward County', 'Williams County']
    },
    'NE': {
      cities: ['Omaha', 'Lincoln', 'Bellevue', 'Grand Island', 'Kearney'],
      metros: ['Omaha-Council Bluffs', 'Lincoln', 'Grand Island'],
      counties: ['Douglas County', 'Lancaster County', 'Sarpy County', 'Hall County', 'Buffalo County']
    },
    'NH': {
      cities: ['Manchester', 'Nashua', 'Concord', 'Derry', 'Rochester'],
      metros: ['Manchester-Nashua', 'Boston-Cambridge-Newton'],
      counties: ['Hillsborough County', 'Rockingham County', 'Merrimack County', 'Strafford County', 'Cheshire County']
    },
    'NJ': {
      cities: ['Newark', 'Jersey City', 'Paterson', 'Elizabeth', 'Edison'],
      metros: ['New York-Newark-Jersey City', 'Philadelphia-Camden-Wilmington', 'Atlantic City-Hammonton'],
      counties: ['Bergen County', 'Essex County', 'Middlesex County', 'Hudson County', 'Monmouth County']
    },
    'NM': {
      cities: ['Albuquerque', 'Las Cruces', 'Rio Rancho', 'Santa Fe', 'Roswell'],
      metros: ['Albuquerque', 'Las Cruces', 'Santa Fe'],
      counties: ['Bernalillo County', 'Dona Ana County', 'Santa Fe County', 'Sandoval County', 'San Juan County']
    },
    'NV': {
      cities: ['Las Vegas', 'Henderson', 'Reno', 'North Las Vegas', 'Sparks'],
      metros: ['Las Vegas-Henderson-Paradise', 'Reno', 'Carson City'],
      counties: ['Clark County', 'Washoe County', 'Carson City', 'Lyon County', 'Elko County']
    },
    'NY': {
      cities: ['New York City', 'Buffalo', 'Rochester', 'Yonkers', 'Syracuse', 'Albany', 'New Rochelle', 'Mount Vernon', 'Schenectady', 'Utica'],
      metros: ['New York-Newark-Jersey City', 'Buffalo-Cheektowaga-Niagara Falls', 'Rochester', 'Albany-Schenectady-Troy', 'Syracuse'],
      counties: ['New York County', 'Kings County', 'Queens County', 'Bronx County', 'Richmond County', 'Nassau County', 'Suffolk County', 'Westchester County', 'Erie County', 'Monroe County']
    },
    'OH': {
      cities: ['Columbus', 'Cleveland', 'Cincinnati', 'Toledo', 'Akron'],
      metros: ['Columbus', 'Cleveland-Elyria', 'Cincinnati', 'Dayton', 'Akron'],
      counties: ['Cuyahoga County', 'Franklin County', 'Hamilton County', 'Montgomery County', 'Summit County']
    },
    'OK': {
      cities: ['Oklahoma City', 'Tulsa', 'Norman', 'Broken Arrow', 'Lawton'],
      metros: ['Oklahoma City', 'Tulsa', 'Lawton'],
      counties: ['Oklahoma County', 'Tulsa County', 'Cleveland County', 'Comanche County', 'Canadian County']
    },
    'OR': {
      cities: ['Portland', 'Eugene', 'Salem', 'Gresham', 'Hillsboro'],
      metros: ['Portland-Vancouver-Hillsboro', 'Eugene-Springfield', 'Salem', 'Medford'],
      counties: ['Multnomah County', 'Washington County', 'Clackamas County', 'Lane County', 'Marion County']
    },
    'PA': {
      cities: ['Philadelphia', 'Pittsburgh', 'Allentown', 'Erie', 'Reading'],
      metros: ['Philadelphia-Camden-Wilmington', 'Pittsburgh', 'Allentown-Bethlehem-Easton', 'Reading'],
      counties: ['Philadelphia County', 'Allegheny County', 'Montgomery County', 'Bucks County', 'Chester County']
    },
    'RI': {
      cities: ['Providence', 'Warwick', 'Cranston', 'Pawtucket', 'East Providence'],
      metros: ['Providence-Warwick'],
      counties: ['Providence County', 'Kent County', 'Washington County', 'Bristol County', 'Newport County']
    },
    'SC': {
      cities: ['Columbia', 'Charleston', 'North Charleston', 'Mount Pleasant', 'Rock Hill'],
      metros: ['Columbia', 'Charleston-North Charleston', 'Greenville-Anderson-Mauldin'],
      counties: ['Greenville County', 'Richland County', 'Charleston County', 'Lexington County', 'Horry County']
    },
    'SD': {
      cities: ['Sioux Falls', 'Rapid City', 'Aberdeen', 'Brookings', 'Watertown'],
      metros: ['Sioux Falls', 'Rapid City'],
      counties: ['Minnehaha County', 'Pennington County', 'Lincoln County', 'Brown County', 'Codington County']
    },
    'TN': {
      cities: ['Nashville', 'Memphis', 'Knoxville', 'Chattanooga', 'Clarksville'],
      metros: ['Nashville-Davidson-Murfreesboro-Franklin', 'Memphis', 'Knoxville', 'Chattanooga'],
      counties: ['Davidson County', 'Shelby County', 'Knox County', 'Hamilton County', 'Rutherford County']
    },
    'TX': {
      cities: ['Houston', 'San Antonio', 'Dallas', 'Austin', 'Fort Worth', 'El Paso', 'Arlington', 'Corpus Christi', 'Plano', 'Lubbock'],
      metros: ['Dallas-Fort Worth-Arlington', 'Houston-The Woodlands-Sugar Land', 'San Antonio-New Braunfels', 'Austin-Round Rock-Georgetown', 'El Paso'],
      counties: ['Harris County', 'Dallas County', 'Tarrant County', 'Bexar County', 'Travis County', 'Collin County', 'Hidalgo County', 'El Paso County', 'Fort Bend County', 'Montgomery County']
    },
    'UT': {
      cities: ['Salt Lake City', 'West Valley City', 'Provo', 'West Jordan', 'Orem'],
      metros: ['Salt Lake City', 'Provo-Orem', 'Ogden-Clearfield'],
      counties: ['Salt Lake County', 'Utah County', 'Davis County', 'Weber County', 'Washington County']
    },
    'VA': {
      cities: ['Virginia Beach', 'Norfolk', 'Chesapeake', 'Richmond', 'Newport News'],
      metros: ['Virginia Beach-Norfolk-Newport News', 'Richmond', 'Washington-Arlington-Alexandria'],
      counties: ['Fairfax County', 'Prince William County', 'Virginia Beach city', 'Chesterfield County', 'Henrico County']
    },
    'VT': {
      cities: ['Burlington', 'Essex', 'South Burlington', 'Colchester', 'Rutland'],
      metros: ['Burlington-South Burlington'],
      counties: ['Chittenden County', 'Rutland County', 'Washington County', 'Windsor County', 'Franklin County']
    },
    'WA': {
      cities: ['Seattle', 'Spokane', 'Tacoma', 'Vancouver', 'Bellevue'],
      metros: ['Seattle-Tacoma-Bellevue', 'Spokane-Spokane Valley', 'Kennewick-Richland', 'Olympia-Tumwater'],
      counties: ['King County', 'Pierce County', 'Snohomish County', 'Spokane County', 'Clark County']
    },
    'WI': {
      cities: ['Milwaukee', 'Madison', 'Green Bay', 'Kenosha', 'Racine'],
      metros: ['Milwaukee-Waukesha-West Allis', 'Madison', 'Green Bay', 'Racine'],
      counties: ['Milwaukee County', 'Dane County', 'Waukesha County', 'Brown County', 'Racine County']
    },
    'WV': {
      cities: ['Charleston', 'Huntington', 'Parkersburg', 'Morgantown', 'Wheeling'],
      metros: ['Charleston', 'Huntington-Ashland', 'Morgantown'],
      counties: ['Kanawha County', 'Cabell County', 'Wood County', 'Monongalia County', 'Jefferson County']
    },
    'WY': {
      cities: ['Cheyenne', 'Casper', 'Laramie', 'Gillette', 'Rock Springs'],
      metros: ['Cheyenne', 'Casper'],
      counties: ['Laramie County', 'Natrona County', 'Campbell County', 'Sweetwater County', 'Fremont County']
    }
  };
  const states = [
    'AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL',
    'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA',
    'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE',
    'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI',
    'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'
  ];

 
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      states: states.map(state => ({
        code: state,
        checked: false
      }))
    }));
  }, []);


  useEffect(() => {
    // Restore form data from context state when component mounts
    if (state.zip_codes || state.states || state.cities) {
      setFormData(prev => ({
        ...prev,
        zipCodes: state.zip_codes ? state.zip_codes.join(', ') : '',
        states: prev.states.map(stateItem => ({
          ...stateItem,
          checked: state.states ? state.states.includes(stateItem.code) : false
        }))
      }));
  
      // Restore selected cities
      if (state.cities && state.cities.length > 0) {
        setSelectedItems(prev => ({
          ...prev,
          cities: state.cities || []
        }));
      }
  
      // Update available items based on selected states
      if (state.states && state.states.length > 0) {
        const cities = [];
        const metros = [];
        const counties = [];
  
        state.states.forEach(stateCode => {
          if (stateData[stateCode]) {
            cities.push(...stateData[stateCode].cities);
            metros.push(...stateData[stateCode].metros);
            counties.push(...stateData[stateCode].counties);
          }
        });
  
        // Remove already selected cities from available items
        const availableCities = cities.filter(city => 
          !state.cities || !state.cities.includes(city)
        );
  
        setAvailableItems({ 
          cities: availableCities, 
          metros, 
          counties 
        });
      }
    }
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  console.log("STATE GEOGRAPHY")
  console.log(state)
  if(name=="zipCodes"){
    setState((prev)=>{
      return {
        ...prev,
        zip_codes:[value]
      }
    })
  }
  };


  const handleStateChange = (stateCode) => {
    setFormData(prev => {
      const updatedStates = prev.states.map(state => 
        state.code === stateCode 
          ? { ...state, checked: !state.checked }
          : state
      );
      
      // Get all currently selected state codes (including the one just toggled)
      const selectedStateCodes = updatedStates.filter(s => s.checked).map(s => s.code);
      
      // Update available items immediately with the new selection
      const cities = [];
      const metros = [];
      const counties = [];
  
      selectedStateCodes.forEach(state => {
        if (stateData[state]) {
          cities.push(...stateData[state].cities);
          metros.push(...stateData[state].metros);
          counties.push(...stateData[state].counties);
        }
      });
  
      setAvailableItems({ cities, metros, counties });
      
      return {
        ...prev,
        states: updatedStates
      };
    });
  
    // Update the context state
    setState(prev => {
      const alreadySelected = prev.states.includes(stateCode);
      return {
        ...prev,
        states: alreadySelected
          ? prev.states.filter(code => code !== stateCode)
          : [...prev.states, stateCode]
      };
    });
  };

  const unselectAllStates = () => {
  setFormData(prev => ({
    ...prev,
    states: prev.states.map(state => ({
      ...state,
      checked: false
    }))
  }));

  // Clear the context state
  setState(prev => ({
    ...prev,
    states: []
  }));

  // Clear all available items since no states are selected
  setAvailableItems({ cities: [], metros: [], counties: [] });
  
  // Also clear selected items
  setSelectedItems({ cities: [], metros: [], counties: [] });
};
  const updateAvailableItems = (selectedStates) => {
    const cities = [];
    const metros = [];
    const counties = [];

    selectedStates.forEach(state => {
      if (stateData[state]) {
        cities.push(...stateData[state].cities);
        metros.push(...stateData[state].metros);
        counties.push(...stateData[state].counties);
      }
    });

    setAvailableItems({ cities, metros, counties });
  };

 
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

 
  const moveItems = (type, direction, items = []) => {
    
    if (direction === 'right') {
      setSelectedItems(prev => ({
        ...prev,
        [type]: [...prev[type], ...items]
      }));
      setState((prev)=>{
        return {
          ...state,
          cities:items
        }
      })
      setAvailableItems(prev => ({
        ...prev,
        [type]: prev[type].filter(item => !items.includes(item))
      }));
      setState((prev)=>{
        return {
          ...prev,
          cities:prev.cities.filter(u=>u==items[0])
        }
      })
    } else {
      setSelectedItems(prev => ({
        ...prev,
        [type]: prev[type].filter(item => !items.includes(item))
      }));
      setAvailableItems(prev => ({
        ...prev,
        [type]: [...prev[type], ...items]
      }));
    }
  };

  const continuetonext=()=>{
   
    setActiveTab("demographics")
  }


  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        fileStatus: `Uploaded: ${file.name}`
      }));
    }
  };


  const resetAll = () => {
    setFormData({
      zipCodes: '',
      centerZip: '',
      radiusMiles: '',
      cityState: '',
      metroState: '',
      countyState: '',
      configName: '',
      selectAllStates: false,
      states: states.map(state => ({ code: state, checked: false })),
      fileStatus: ''
    });
    setSelectedItems({ cities: [], metros: [], counties: [] });
    setAvailableItems({ cities: [], metros: [], counties: [] });
  };


  
  if (activeTab === 'consumer') {
    return <Consumer/>;
  }


  if (activeTab === 'demographics') {
    return <Demographics/>;
  }

  if(activeTab==="supression"){
    return <Suppression/>
  }

  return (
    <div className="campaign-builder">
      {/* Background Pattern */}
      <div className="background-pattern">
        <div className="background-gradient" />
        <div className="gradient-blob-top" />
        <div className="gradient-blob-bottom" />
      </div>

      <div className="tab-container">
        <div className="tab-wrapper">
          <div className="tab-nav">
            <div className="tab-buttons">
              <button
                onClick={() => setActiveTab('consumer')}
                className={`tab-button ${
                  activeTab === 'consumer'
                    ? 'tab-button-active'
                    : 'tab-button-inactive'
                }`}
              >
                Consumer
              </button>
              <button
                onClick={() => setActiveTab('geography')}
                className={`tab-button ${
                  activeTab === 'geography'
                    ? 'tab-button-active'
                    : 'tab-button-inactive'
                }`}
              >
                Geography
              </button>

              
              <button
                onClick={() => setActiveTab('demographics')}
                className={`tab-button ${
                  activeTab === 'geography'
                    ? 'tab-button-active'
                    : 'tab-button-inactive'
                }`}
              >
               Demographics
              </button>

          
            </div>
          </div>
        </div>
      </div>
      
      <div className="content-wrapper">
        {/* Header */}
       

        {/* Main Card */}
        <div className="main-card">
        <div className="header-container">
          <div className="header-icon">
            <MapPin size={24} color="white" />
          </div>
          <h1 className="header-title">Organic Lead List Builder</h1>
          <p className="header-subtitle">Configure your geographic targeting preferences</p>
          
        </div>
          <div className="card-grid">
            {/* Filter Section */}
            <div className="filter-section">
              {/* Zipcodes Section */}
              <div className="filter-card">
                <div 
                  className={`filter-header ${expandedSections.zipcodes ? 'filter-header-expanded' : 'filter-header-collapsed'}`}
                  onClick={() => toggleSection('zipcodes')}
                >
                  <div className="filter-header-content">
                    <span className="filter-header-title">
                      <MapPin size={16} /> Zipcodes
                    </span>
                    {expandedSections.zipcodes ? 
                      <ChevronDown className="w-4 h-4" /> : 
                      <ChevronRight className="w-4 h-4" />
                    }
                  </div>
                </div>
                {expandedSections.zipcodes && (
                  <div className="filter-content">
                    <div style={{ marginBottom: '24px' }}>
                      <label className="input-label">
                        Enter up to 200 zip codes separated by commas
                      </label>
                      <textarea 
                        className="textarea-input"
                        placeholder="12345, 67890, 54321..." 
                        name="zipCodes"
                        value={formData.zipCodes}
                        onChange={handleInputChange}
                        rows="4"
                      />
                    </div>
                    
                    {/* <div style={{ marginBottom: '24px' }}>
                      <label className="input-label">
                        Zip code radius search
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
                        <input 
                          type="text" 
                          className="text-input"
                          placeholder="Zip Code" 
                          name="centerZip"
                          value={formData.centerZip}
                          onChange={handleInputChange}
                        />
                        <input 
                          type="text" 
                          className="text-input"
                          placeholder="Miles" 
                          name="radiusMiles"
                          value={formData.radiusMiles}
                          onChange={handleInputChange}
                        />
                        <button 
                          className="primary-button"
                          onClick={() => alert('This would normally show a selection dialog')}
                        >
                          Look up
                        </button>
                      </div>
                    </div> */}

                    {/* <div>
                      <label className="input-label">
                        Upload CSV file with zip codes
                      </label>
                      <div 
                        className="file-upload-container"
                        onClick={() => document.getElementById('csvFile').click()}
                      >
                        <input 
                          type="file" 
                          id="csvFile" 
                          accept=".csv" 
                          onChange={handleFileUpload}
                          className="file-input"
                        />
                        <FileInput size={32} className="file-upload-icon" />
                        <p className="file-upload-text">Click to upload CSV file</p>
                        <small className="file-upload-subtext">Single column of zip codes only</small>
                      </div>
                      {formData.fileStatus && (
                        <div className="file-status">{formData.fileStatus}</div>
                      )}
                    </div> */}
                  </div>
                )}
              </div>

              {/* States Section */}
              <div className="filter-card">
                <div 
                  className={`filter-header ${expandedSections.state ? 'filter-header-expanded' : 'filter-header-collapsed'}`}
                  onClick={() => toggleSection('state')}
                >
                  <div className="filter-header-content">
                    <span className="filter-header-title">
                      <MapPin size={16} /> States
                    </span>
                    {expandedSections.state ? 
                      <ChevronDown className="w-4 h-4" /> : 
                      <ChevronRight className="w-4 h-4" />
                    }
                  </div>
                </div>
                {expandedSections.state && (
                  <div className="filter-content">
                    <div className="state-grid">
                      {formData.states.map((state) => (
                        <div key={state.code} className="state-item">
                          <input 
                            type="checkbox"
                            checked={state.checked}
                            onChange={() => handleStateChange(state.code)}
                            className="state-checkbox"
                          />
                          <span className="state-label">{state.code}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

<button 
      className="reset-button"
      onClick={unselectAllStates}
      style={{ 
        padding: '8px 16px', 
        fontSize: '14px',
        backgroundColor: '#ef4444',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'background-color 0.2s'
      }}
      onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
      onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
    >
      Unselect All States
    </button>
              </div>

              {/* City Selection */}
              <div className="filter-card">
                <div 
                  className={`filter-header ${expandedSections.city ? 'filter-header-expanded' : 'filter-header-collapsed'}`}
                  onClick={() => toggleSection('city')}
                >
                  <div className="filter-header-content">
                    <span className="filter-header-title">
                      <MapPin size={16} /> Cities
                    </span>
                    {expandedSections.city ? 
                      <ChevronDown className="w-4 h-4" /> : 
                      <ChevronRight className="w-4 h-4" />
                    }
                  </div>
                </div>
                {expandedSections.city && (
                  <div className="filter-content">
                    <div className="transfer-grid">
                      <div className="transfer-column">
                        <h4 className="transfer-column-title">Available Cities</h4>
                        <div className="transfer-list">
                          {availableItems.cities.map((city, index) => (
                            <div 
                              key={index}
                              className="transfer-item"
                              onClick={() => moveItems('cities', 'right', [city])}
                            >
                              {city}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="transfer-buttons">
                        <button 
                          className="transfer-button"
                          onClick={() => moveItems('cities', 'right', availableItems.cities)}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                        <button 
                          className="transfer-button transfer-button-reverse"
                          onClick={() => moveItems('cities', 'left', selectedItems.cities)}
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="transfer-column">
                        <h4 className="transfer-column-title">Selected Cities</h4>
                        <div className="transfer-list">
                          {selectedItems.cities.map((city, index) => (
                            <div 
                              key={index}
                              className="transfer-item transfer-item-selected"
                              onClick={() => moveItems('cities', 'left', [city])}
                            >
                              {city}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}  
              </div>
            </div>

            {/* Sidebar */}
            <div className="sidebar-section">
              <button onClick={continuetonext} className="primary-button">
                Continue
              </button>
              
              <div className="summary-card">
                <div className="summary-header">
                  <Mail size={16} /> <Phone size={16} /> Campaign Summary
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div className="summary-item">
                    <span className="summary-label">Type:</span> 
                    <span className="summary-value">Mailing List + Phone</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Status:</span> 
                    <span className="geography-value">Geographic Selection</span>
                  </div>
                </div>
              </div>

              <div className="geography-card">
                <div className="geography-header">
                  <MapPin size={16} /> Geographic Selection
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="summary-item">
  <span className="summary-label">Selected States:</span>
  <div className="geography-value states-container">
    {formData.states.filter(s => s.checked).length > 0 ? (
      formData.states
        .filter(s => s.checked)
        .map((val, i, array) => (
          <span key={i}>
            <span className="state-tag">{val.code}</span>
            {i < array.length - 1 ? ', ' : ''}
          </span>
        ))
    ) : (
      <span className="no-selection">None selected</span>
    )}
  </div>
</div>
                  <div className="summary-item">
                    <span className="summary-label">Selected Cities:</span> 
                    <span className="geography-value">{selectedItems.cities.length}</span>
                  </div>
                </div>
              </div>

              {/* <div className="save-card">
                <div className="save-header">
                  <Save size={16} /> Save Configuration
                </div>
                <input 
                  type="text" 
                  className="save-input"
                  placeholder="Configuration name..." 
                  name="configName"
                  value={formData.configName}
                  onChange={handleInputChange}
                />
                <button 
                  className="save-button"
                  onClick={() => alert('Configuration saved!')}
                >
                  Save
                </button>
              </div> */}

              {/* <div style={{ textAlign: 'center' }}>
                <button 
                  className="reset-button"
                  onClick={resetAll}
                >
                  <RefreshCw size={16} /> Reset All
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const Consumer = () => {
  const [activeTab, setActiveTab] = useState('consumer');
  const {state,setState}=useContext(ConsumerContext)
  const [formData, setFormData] = useState({
    campaignType: '',
    dedupOption: '', 
    phoneOptions: {
      landline: false,
      landlineDNC: false,
      cell: false,
      cellDNC: false,
      mixed: false,
      mixedDNC: false
    }
  });
  
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showSampleModal, setShowSampleModal] = useState(false);

  const handleCampaignTypeChange = (value) => {
    setFormData(prev => ({
      ...prev,
      campaignType: value
    }));
console.log("state")
console.log(state)
    setState((prev)=>{
      return {
        ...prev,
        campaign_type:value
      }
    })
  };

  const handleDedupChange = (value) => {

    console.log(value)
    setFormData(prev => ({
      ...prev,
      dedupOption: value
    }));
    setState((prev)=>{
      return {
        ...prev,
        dedup_option:value
      }
    })
  };

  const handlePhoneOptionChange = (option, checked) => {
    setFormData(prev => ({
      ...prev,
      phoneOptions: {
        ...prev.phoneOptions,
        [option]: checked
      }
    }));


    

    setState((prev)=>{
      return {
        ...prev,
        phone_options:option
      }
    })
  };

  useEffect(() => {
    // Restore form data from context state when component mounts
    setFormData(prev => ({
      ...prev,
      campaignType: state.campaign_type || '',
      dedupOption: state.dedup_option || '',
      phoneOptions: state.phone_options || {
        landline: false,
        landlineDNC: false,
        cell: false,
        cellDNC: false,
        mixed: false,
        mixedDNC: false
      }
    }));
  }, [state.campaign_type, state.dedup_option, state.phone_options]);

  const handleContinue = () => {
 
    setActiveTab('geography');
  };

  const showPhoneOptions = formData.campaignType.includes("phone") || formData.campaignType.includes("Phone");
  const showDedupOptions = !formData.campaignType.includes("Only")

  if (activeTab === 'geography') {
    return <Geography />;
  }

  if (activeTab === 'demographics') {
    return <Demographics/>;
  }

  if(activeTab==="supression"){
    return <Suppression/>
  }



  return (
    <div className="campaign-builder">
      {/* Background Pattern */}
      <div className="background-pattern">
        <div className="background-gradient" />
        <div className="gradient-blob-top" />
        <div className="gradient-blob-bottom" />
      </div>
      
      {/* Tab Navigation */}
      <div className="tab-container">
        <div className="tab-wrapper">
          <div className="tab-nav">
            <div className="tab-buttons">
              <button
                onClick={() => setActiveTab('consumer')}
                className={`tab-button ${
                  activeTab === 'consumer'
                    ? 'tab-button-active'
                    : 'tab-button-inactive'
                }`}
              >
                Consumer
              </button>
              <button
                onClick={() => setActiveTab('geography')}
                className={`tab-button ${
                  activeTab === 'geography'
                    ? 'tab-button-active'
                    : 'tab-button-inactive'
                }`}
              >
                Geography
              </button>

              <button
                onClick={() => setActiveTab('demographics')}
                className={`tab-button ${
                  activeTab === 'geography'
                    ? 'tab-button-active'
                    : 'tab-button-inactive'
                }`}
              >
               Demographics
              </button>

            
            </div>
          </div>
        </div>
      </div>

      <div className="content-wrapper">
        <div className="main-card">
          <div className="card-grid">
            {/* Left Side - Campaign Configuration */}
            <div style={{ gridColumn: 'span 2 / span 2' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div style={{ textAlign: 'center' }}>
                <div style={{width:'75vw'}} className="header-container">
          <div className="header-icon">
            <Database size={24} color="white" />
          </div>
          <h1 className="header-title">Organic Lead List Builder</h1>
          <p className="header-subtitle">Configure your consumer preferences</p>
         
        </div>
                  
                
                </div>


                {/* Campaign Type Section */}
                <div className="filter-card">
                  <div className="filter-content">
                    <h3 className="campaign-subtitle" style={{ marginBottom: '16px' }}>Campaign Type:</h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div className="radio-option">
                        <input
                          type="radio"
                          id="postal"
                          name="campaignType"
                          value="Mailing List - (Postal Info Only)"
                          checked={formData.campaignType === 'Mailing List - (Postal Info Only)'}
                          onChange={(e) => handleCampaignTypeChange(e.target.value)}
                          className="radio-input"
                        />
                        <label htmlFor="postal" className="radio-label">Mailing List - (Postal Info Only)</label>
                      </div>

                      <div className="radio-option">
                        <input
                          type="radio"
                          id="telemarketing"
                          name="campaignType"
                          value="Mailing List + Phone"
                          checked={formData.campaignType === 'Mailing List + Phone'}
                          onChange={(e) => handleCampaignTypeChange(e.target.value)}
                          className="radio-input"
                        />
                        <label htmlFor="telemarketing" className="radio-label">Mailing List + Phone</label>
                      </div>

                      <div className="radio-option">
                        <input
                          type="radio"
                          id="telemarketing_email_optional"
                          name="campaignType"
                          value="Mailing List + Phone + (Email where available)"
                          checked={formData.campaignType === 'Mailing List + Phone + (Email where available)'}
                          onChange={(e) => handleCampaignTypeChange(e.target.value)}
                          className="radio-input"
                        />
                        <label htmlFor="telemarketing_email_optional" className="radio-label">
                          Mailing List + Phone + (Email where available)
                        </label>
                      </div>

                      <div className="radio-option">
                        <input
                          type="radio"
                          id="email"
                          name="campaignType"
                          value="Mailing List + Emails"
                          checked={formData.campaignType === 'Mailing List + Emails'}
                          onChange={(e) => handleCampaignTypeChange(e.target.value)}
                          className="radio-input"
                        />
                        <label htmlFor="email" className="radio-label">Mailing List + Emails</label>
                      </div>

                      <div className="radio-option">
                        <input
                          type="radio"
                          id="email_telemarketing_optional"
                          name="campaignType"
                          value="Mailing List + Email + (Phone where available)"
                          checked={formData.campaignType === 'Mailing List + Email + (Phone where available)'}
                          onChange={(e) => handleCampaignTypeChange(e.target.value)}
                          className="radio-input"
                        />
                        <label htmlFor="email_telemarketing_optional" className="radio-label">
                          Mailing List + Email + (Phone where available)
                        </label>
                      </div>
                    </div>

                    {/* Phone Options */}
                    {showPhoneOptions && (
                      <div className="phone-options">
                        <h4 className="phone-options-title">Phone Options:</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <div className="phone-options-grid">
                            <div className="phone-option">
                              <input
                                type="checkbox"
                                id="chkbox_Phone"
                                checked={formData.phoneOptions.landline}
                                onChange={(e) => handlePhoneOptionChange('landline', e.target.checked)}
                                className="phone-checkbox"
                              />
                              <label htmlFor="chkbox_Phone" className="phone-label">Landline</label>
                            </div>
                            <div className="phone-option">
                              <input
                                type="checkbox"
                                id="chkbox_DNCPhone"
                                checked={formData.phoneOptions.landlineDNC}
                                onChange={(e) => handlePhoneOptionChange('landlineDNC', e.target.checked)}
                                disabled={!formData.phoneOptions.landline}
                                className="phone-checkbox"
                              />
                              <label htmlFor="chkbox_DNCPhone" className="phone-label">DNC Scrub</label>
                            </div>
                          </div>

                          <div className="phone-options-grid">
                            <div className="phone-option">
                              <input
                                type="checkbox"
                                id="chkbox_Cell"
                                checked={formData.phoneOptions.cell}
                                onChange={(e) => handlePhoneOptionChange('cell', e.target.checked)}
                                className="phone-checkbox"
                              />
                              <label htmlFor="chkbox_Cell" className="phone-label">Cell</label>
                            </div>
                            <div className="phone-option">
                              <input
                                type="checkbox"
                                id="chkbox_DNCCell"
                                checked={formData.phoneOptions.cellDNC}
                                onChange={(e) => handlePhoneOptionChange('cellDNC', e.target.checked)}
                                disabled={!formData.phoneOptions.cell}
                                className="phone-checkbox"
                              />
                              <label htmlFor="chkbox_DNCCell" className="phone-label">DNC Scrub</label>
                            </div>
                          </div>

                          <div className="phone-options-grid">
                            <div className="phone-option">
                              <input
                                type="checkbox"
                                id="chkbox_Mixed"
                                checked={formData.phoneOptions.mixed}
                                onChange={(e) => handlePhoneOptionChange('mixed', e.target.checked)}
                                className="phone-checkbox"
                              />
                              <label htmlFor="chkbox_Mixed" className="phone-label">Landline OR Cell</label>
                            </div>
                            <div className="phone-option">
                              <input
                                type="checkbox"
                                id="chkbox_DNCMixed"
                                checked={formData.phoneOptions.mixedDNC}
                                onChange={(e) => handlePhoneOptionChange('mixedDNC', e.target.checked)}
                                disabled={!formData.phoneOptions.mixed}
                                className="phone-checkbox"
                              />
                              <label htmlFor="chkbox_DNCMixed" className="phone-label">DNC Scrub</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Dedup Options */}
                {showDedupOptions && (
                  <div className="filter-card">
                    <div className="filter-content">
                      <h3 className="campaign-subtitle" style={{ marginBottom: '16px' }}>Dedup Option:</h3>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div className="radio-option">
                          <input
                            type="radio"
                            id="onePerIndividual"
                            name="dedupOption"
                            value="One Per Individual"
                            checked={formData.dedupOption === 'One Per Individual'}
                            onChange={(e) => handleDedupChange(e.target.value)}
                            className="radio-input"
                          />
                          <label htmlFor="onePerIndividual" className="radio-label">One Per Individual</label>
                        </div>

                        <div className="radio-option">
                          <input
                            type="radio"
                            id="onePerHH"
                            name="dedupOption"
                            value="One Per Household"
                            checked={formData.dedupOption === 'One Per Household'}
                            onChange={(e) => handleDedupChange(e.target.value)}
                            className="radio-input"
                          />
                          <label htmlFor="onePerHH" className="radio-label">One Per Household</label>
                        </div>

                        <div className="radio-option">
                          <input
                            type="radio"
                            id="onePerHH"
                            name="dedupOption"
                            value="This feature removes duplicate records from your data set to ensure each contact appears only once, improving accuracy and reducing redundancy."
                            checked={formData.dedupOption === 'This feature removes duplicate records from your data set to ensure each contact appears only once, improving accuracy and reducing redundancy.'}
                            onChange={(e) => handleDedupChange(e.target.value)}
                            className="radio-input"
                          />
                          <label htmlFor="onePerHH" className="radio-label">This feature removes duplicate records from your data set to ensure each contact appears only once, improving accuracy and reducing redundancy.</label>
                        </div>

                        <div className="radio-option">
                          <input
                            type="radio"
                            id="allPerHH"
                            name="dedupOption"
                            value="All Per Household"
                            checked={formData.dedupOption === 'All Per Household'}
                            onChange={(e) => handleDedupChange(e.target.value)}
                            className="radio-input"
                          />
                          <label htmlFor="allPerHH" className="radio-label">All Per Household</label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Information & Actions */}
            <div className="sidebar-section">
              <button 
                className="primary-button" 
                onClick={handleContinue}
              >
                Continue
              </button>
              
              <div className="info-card-dark">
                <div className="info-card-overlay" />
                
              </div>

              <div className="info-card-light">
                <p className="info-card-text">
                  National consumer database of <span className="info-card-highlight">218 million</span> records, 
                  <span className="info-card-highlight-purple"> 82 million</span> emails & 
                  <span className="info-card-highlight-green"> 76 million</span> with cell phones
                </p>
              </div>

            

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="feature-badge feature-badge-green">
                  <div className="feature-icon feature-icon-green">
                    <Shield style={{ width: '16px', height: '16px', color: '#059669' }} />
                  </div>
                  <span className="feature-text feature-text-green">Enterprise-grade security</span>
                </div>
                <div className="feature-badge feature-badge-yellow">
                  <div className="feature-icon feature-icon-yellow">
                    <Zap style={{ width: '16px', height: '16px', color: '#d97706' }} />
                  </div>
                  <span className="feature-text feature-text-yellow">Real-time data processing</span>
                </div>
                <div className="feature-badge feature-badge-blue">
                  <div className="feature-icon feature-icon-blue">
                    <Globe style={{ width: '16px', height: '16px', color: '#2563eb' }} />
                  </div>
                  <span className="feature-text feature-text-blue">Global data coverage</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="modal-overlay" onClick={() => setShowVideoModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">B2C - Consumer List</h3>
              <button 
                className="modal-close-button" 
                onClick={() => setShowVideoModal(false)}
              >
                <X style={{ width: '20px', height: '20px', color: '#64748b' }} />
              </button>
            </div>
            <div className="modal-content">
              <div className="modal-video-placeholder">
                <div style={{ textAlign: 'center' }}>
                  <Play style={{ width: '64px', height: '64px', color: '#94a3b8', margin: '0 auto 16px' }} />
                  <p style={{ color: '#64748b' }}>Video content would be displayed here</p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="modal-button"
                onClick={() => setShowVideoModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sample Modal */}
      {showSampleModal && (
        <div className="modal-overlay" onClick={() => setShowSampleModal(false)}>
          <div className="modal-container sample-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Generic Sample</h3>
              <button 
                className="modal-close-button" 
                onClick={() => setShowSampleModal(false)}
              >
                <X style={{ width: '20px', height: '20px', color: '#64748b' }} />
              </button>
            </div>
            <div className="modal-content">
              <p className="sample-content">General sample showing fields available after purchase</p>
              <div className="sample-field-list">
                <h4 className="sample-field-title">Available Fields:</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div className="sample-field-item">
                    <div className="sample-field-bullet sample-field-bullet-blue"></div>
                    Full Name
                  </div>
                  <div className="sample-field-item">
                    <div className="sample-field-bullet sample-field-bullet-green"></div>
                    Mailing Address
                  </div>
                  <div className="sample-field-item">
                    <div className="sample-field-bullet sample-field-bullet-purple"></div>
                    Phone Number
                  </div>
                  <div className="sample-field-item">
                    <div className="sample-field-bullet sample-field-bullet-yellow"></div>
                    Email Address
                  </div>
                  <div className="sample-field-item">
                    <div className="sample-field-bullet sample-field-bullet-red"></div>
                    Demographics
                  </div>
                  <div className="sample-field-item">
                    <div className="sample-field-bullet sample-field-bullet-indigo"></div>
                    Household Information
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="modal-button"
                onClick={() => setShowSampleModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Consumer;