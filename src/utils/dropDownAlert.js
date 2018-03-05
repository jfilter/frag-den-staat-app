// https://github.com/testshallpass/react-native-dropdownalert/issues/73
class DropDownHolder {
  setDropDown(dropDown) {
    if (dropDown === null) return;
    this.dropDown = dropDown;
  }

  getDropDown() {
    return this.dropDown;
  }
}

const errorAlert = new DropDownHolder();
const successAlert = new DropDownHolder();

export { errorAlert, successAlert };
