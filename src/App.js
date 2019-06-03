import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
//import { fetchWhiskies } from './actions';
import { fetchEmployee } from './actions';

const dropdownStyles = {
  dropdown: { width: 300 }
};

const departments = [
  { key: 'HR', text: 'HR' },
  { key: 'ENG', text: 'ENGINEERING' },
];

let employees = [
  { key: '1', text: '1', group : 'HR' },
  { key: '2', text: '2', group : 'HR' },
  { key: '3', text: '3', group : 'HR' },
  { key: '4', text: '4', group : 'HR' },
  { key: '5', text: '5', group : 'HR' },
  { key: '6', text: '6', group : 'ENG' },
  { key: '7', text: '7', group : 'ENG' },
  { key: '8', text: '8', group : 'ENG' },
  { key: '9', text: '9', group : 'ENG' },
  { key: '10', text: '10', group : 'ENG' },
];

const stackTokens = { childrenGap: 10 };

class App extends React.Component  {

  constructor(props) {
    super(props);
    this.state = {
      department : null,
      employee : null,
    };
  }

  changeDepart = (event,item) => {
    this.setState({ department: item });
  }

  changeEmployee = (event,item) => {
    this.setState({ employee: item });
  }

  render() {
    const { department, employee } = this.state;
    const filteredOptions = employees.filter((o)=> 
         (department) ? department.key === o.group : false
    );

    const {
      data,
      //fetchWhiskies, 
      fetchEmployee,
      isLoading,
      error,
      details
    } = this.props;


    return <Stack tokens={stackTokens}>
      <Dropdown 
        placeholder="Select Department" 
        label="Department" 
        onChange={this.changeDepart}  
        options={departments} 
        styles={dropdownStyles} />
        
      <Dropdown 
        placeholder="Select Employees"
        label="Employees"
        onChange={this.changeEmployee}
        options={filteredOptions} 
        styles={dropdownStyles} />
        {isLoading}
        
        <button onClick={() => fetchEmployee(this.state.employee.key)}>Fetch Details</button>

      {data && <div>
          <img src={data.avatar} />
          <div>{data.id}</div>
          <div>{data.first_name} {data.last_name}</div>
        </div>}
        
    </Stack>
  }
};

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch =>
    bindActionCreators({
      fetchEmployee
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);