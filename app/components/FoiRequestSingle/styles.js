import { StyleSheet } from 'react-native';

import {
  primaryColor,
  secondaryColor,
  greyDark,
  greyLight,
} from '../../styles/colors';

const spaceGeneral = 10;
const spaceMore = 20;

export default StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
    padding: spaceGeneral,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: spaceGeneral,
    marginBottom: spaceGeneral,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 18,
    textAlign: 'center',
    color: primaryColor,
    marginBottom: spaceMore,
  },
  subheadingTo: {
    textAlign: 'center',
    marginBottom: spaceGeneral,
    fontStyle: 'italic',
  },
  table: {
    width: '100%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: secondaryColor,
    paddingVertical: spaceGeneral,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 1,
  },
  item1: { width: '33%' },
  item2: { width: '67%' },
  summary: {
    marginTop: spaceGeneral,
    marginBottom: spaceGeneral / 2,
  },
  msgContainer: {
    marginBottom: 100,
  },
  msgHeader: {
    padding: spaceGeneral,
    borderColor: greyDark,
    borderWidth: 1,
    marginVertical: spaceMore / 2,
  },
  msgHeaderText: {
    color: primaryColor,
  },
  msgContent: {
    padding: spaceGeneral,
    borderColor: secondaryColor,
    borderWidth: 1,
    marginVertical: spaceMore / 2,
  },
  attachmentsRowLabel: {
    flex: 1,
    flexDirection: 'row',
  },
  attachmentsRowButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: spaceGeneral,
  },
  viewPdfButton: {
    marginLeft: spaceGeneral,
    marginRight: 0,
  },
  dividerAttachments: {
    backgroundColor: greyLight,
    marginBottom: spaceGeneral,
  },
  dividerBeforeMessageContent: {
    backgroundColor: greyLight,
    marginBottom: spaceGeneral,
    marginTop: spaceGeneral,
  },
  hotfixTextPadding: {
    paddingRight: spaceGeneral * 2 + 1, // the padding space and the border
  },
  downloadButton: { marginLeft: 0, marginRight: 0 },
  linkTouchable: {
    alignSelf: 'flex-start',
    padding: 10,
  },
  link: {
    color: primaryColor,
  },
  law: {
    paddingVertical: 10,
  },
});
