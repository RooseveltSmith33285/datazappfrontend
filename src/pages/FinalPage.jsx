import React, { useState, useEffect } from 'react';
import { useCallback,useRef,useContext } from 'react';
import { Country, State, City }  from 'country-state-city';

import './Consumer.css'; 


import { ConsumerContext } from '../context/ConsumerContextAPI';


import { 
  Database, Shield, Zap, Globe, Play,AlertCircle, HelpCircle, X, MapPin, 
  ChevronDown, ChevronRight, Mail, Phone, Save, RefreshCw, 
  ArrowRight, ArrowLeft, FileInput, Upload, Plus, Check
} from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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



export default Suppression