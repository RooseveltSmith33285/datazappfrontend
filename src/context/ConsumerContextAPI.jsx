import React, { createContext, useState } from 'react';

export const ConsumerContext = createContext();

const ConsumerContextProvider = ({ children }) => {
    const [state, setState] = useState({
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
        supression_option:'',
        state:'',
        industry_category:'',
        specific_industry:'',
        monthly_lead_volume:'',
        membership_tier:'',
        total_purchase_leads:'',
        plan:'',
        plan_price:''
    });

    return (
        <ConsumerContext.Provider value={{ state, setState }}>
            {children}
        </ConsumerContext.Provider>
    );
};

export default ConsumerContextProvider;