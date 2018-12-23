import React from 'react';

class ContactForm extends React.Component {
  state = {
    name: this.props.contact ? this.props.contact.name : '',
    email: this.props.contact ? this.props.contact.email : '',
    phone: this.props.contact ? this.props.contact.phone : '',
    debt: this.props.contact ? this.props.contact.debt : '',
    notes: this.props.contact ? this.props.contact.notes : '',
    error: ''
  };

  onNameChange = (e) => {
    const name = e.target.value;
    this.setState(() => ({name}))
  };
  onEmailChange = (e) => {
    const email = e.target.value;
    this.setState(() => ({email}));
  };
  onPhoneChange = (e) => {
    const phone = e.target.value;
    this.setState(() => ({phone}));
  };
  onDebtChange = (e) => {
    const debt = e.target.value;
    this.setState(() => ({debt}));
  };
  onNotesChange = (e) => {
    const notes = e.target.value;
    this.setState(() => ({notes}));
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.name.trim() || !this.state.email.trim()) {
      this.setState(() => ({error: 'Please provide name and email'}));
    } else {
      this.setState(() => ({error: ''}));
      this.props.onSubmit({
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        debt: this.state.debt,
        notes: this.state.notes,
      })
    }
  };

  render() {
    return (
      <form className="form contact-form" onSubmit={this.onSubmit} autoComplete="off">
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            autoFocus
            className="text-input form-control"
            value={this.state.name}
            onChange={this.onNameChange}
            required={true}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            className="text-input form-control"
            value={this.state.email}
            onChange={this.onEmailChange}
            required={true}
          />
        </div>
        <div className="form-group">
          <input
            type="tel"
            placeholder="Phone"
            className="text-input form-control"
            value={this.state.phone}
            onChange={this.onPhoneChange}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="Debt, $"
            className="text-input form-control"
            value={this.state.debt}
            onChange={this.onDebtChange}
          />
        </div>
        <div className="form-group">
        <input
          type="text"
          placeholder="Notes"
          className="text-input form-control"
          value={this.state.notes}
          onChange={this.onNotesChange}
        />
        </div>
        <button className="save-contact-btn btn-success rounded col-12">Save contact</button>

      </form>
    )
  }
}

export default ContactForm;