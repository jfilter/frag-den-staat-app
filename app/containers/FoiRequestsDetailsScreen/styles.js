import { StyleSheet } from 'react-native';

import {
  primaryColor,
  secondaryColor,
  greyDark,
  greyLight,
} from '../../styles/colors';

export default StyleSheet.create({
  item1: { width: '33%' },
  item2: { width: '67%' },
  table: {
    width: '100%',
    marginBottom: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: secondaryColor,
    paddingVertical: 5,
    marginHorizontal: 0,
  },
  scrollView: {
    backgroundColor: 'white',
    padding: 10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 18,
    textAlign: 'center',
    color: primaryColor,
    marginBottom: 20,
  },
  subheadingTo: {
    textAlign: 'center',
    marginBottom: 10,
  },
  msgContainer: {
    marginBottom: 100,
  },
  msgHeader: {
    padding: 10,
    borderColor: greyDark,
    borderWidth: 1,
    marginTop: 20,
  },
  msgHeaderText: {
    color: primaryColor,
  },
  msgContent: {
    padding: 10,
    borderColor: secondaryColor,
    borderWidth: 1,
    marginTop: 20,
  },
  attachmentsRowLabel: {
    flex: 1,
    flexDirection: 'row',
  },
  attachmentsRowButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});
