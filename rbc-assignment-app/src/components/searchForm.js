import React, { useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const SearchForm = (props) => {

  const options = [
    { value: '', text: 'Select field to search' },
    { value: 'phonenumber', text: 'PhoneNumber' },
    { value: 'voicemail', text: 'Voicemail' },
    { value: 'userId', text: 'UserId' },
    { value: 'clusterId', text: 'ClusterId' }
  ];



  const [searchValue, setSearchValue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const dateInputRef = useRef(null);
  const [selectedField, setSelectedField] = useState(options[0].value);




  const handleSubmit = () => {
    if (!selectedField) {
      alert('You must select field type to search');
    }
    else if (searchValue.length === 0 || !selectedField || !startDate || !endDate) {
      alert('Please check empty fields');
    }
    else if (endDate < startDate) {
      alert('End date can not be before start date')
    }
    else if (selectedField === 'phonenumber' && searchValue.length > 12) {
      alert('Please check phone number')
    }
    else {
      props.callApi(new Date(startDate).getTime(), new Date(endDate).getTime(), selectedField, searchValue);
    }

  }

  const handleChange = event => {
    setSelectedField(event.target.value);
  };

  return (
    <div className="searchForm">
      <select value={selectedField} onChange={handleChange}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="input"
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        placeholder={selectedField}
        required
      />

      <div className="container">
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          ref={dateInputRef}
          required
        />
        <p>Start Date: {startDate}</p>
        <input
          type="date"
          onChange={e => setEndDate(e.target.value)}
          ref={dateInputRef}
          required
        />
        <p>End Date: {endDate}</p>
      </div>
      <Button onClick={handleSubmit} variant="outlined">Submit</Button>
    </div>
  );
}