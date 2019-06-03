import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import './App.scss';
import { fetchEmployee } from './actions';
import { Button } from 'office-ui-fabric-react/lib/Button';
 
const dropdownStyles = {
 
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
      
      fetchEmployee,
      isLoading,
      error,
      details
    } = this.props;


    return <Stack tokens={stackTokens}>
      <div class="ms-Grid" dir="ltr">
        <div class="ms-Grid-row">
          <div class="ms-Grid-col ms-sm12 ms-md4">
            <Dropdown 
              placeholder="Select Department" 
              label="Department" 
              onChange={this.changeDepart}  
              options={departments} 
              styles={dropdownStyles} />
          </div> 
          <div class="ms-Grid-col ms-sm12 ms-md4">
            <Dropdown 
              placeholder="Select Employees"
              label="Employees"
              onChange={this.changeEmployee}
              options={filteredOptions} 
              styles={dropdownStyles} />
              {isLoading && <h1>Fetching data</h1>}
          </div>  
          <div class="ms-Grid-col ms-sm12 ms-md2">
            <Button className="customBtn" onClick={() => { 
              if(this.state.employee) 
              fetchEmployee(this.state.employee.key) 
              }}>Fetch Details</Button>
          </div>
          <div class="ms-Grid-col ms-sm12 ms-md2">
            <Button className="customBtn" onClick={() => { this.setState({
              department : null,
              employee : null,
            }); }}>Clear</Button>
          </div>
        </div>
      </div>
      {data && <div className="details-container">
          <img className="profileImg" src={data.avatar} />
          <div className="detail">
            <div className="idInfo">{data.id}</div>
            <div className="nameInfo">{data.first_name} {data.last_name}</div>
          </div>
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