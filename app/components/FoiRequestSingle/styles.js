import { StyleSheet } from 'react-native';

import {
  greyDark,
  greyLight,
  primaryColor,
  secondaryColor,
} from '../../styles/colors';

const spaceGeneral = 10;
const spaceMore = 20;

const styles = StyleSheet.create({
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
    paddingHorizontal: spaceGeneral,
    borderTopWidth: 1,
    borderColor: greyLight,
    paddingTop: spaceMore,
  },
  subheading: {
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: spaceGeneral,
  },
  subheadingJurisdiction: {
    textAlign: 'center',
    marginHorizontal: spaceGeneral,
    color: greyDark,
  },
  subheadingTo: {
    textAlign: 'center',
    marginBottom: spaceGeneral,
    // fontStyle: 'italic',
    // color: secondaryColor,
    color: greyDark,
  },
  table: {
    marginTop: spaceMore,
  },
  summary: {
    marginTop: spaceGeneral,
    marginBottom: spaceGeneral / 2,
    paddingHorizontal: spaceGeneral,
    borderBottomWidth: 1,
    borderColor: greyLight,
    paddingBottom: spaceGeneral,
  },
  msgContainer: {
    marginBottom: 100,
    borderBottomWidth: 1,
    borderColor: greyLight,
    paddingBottom: spaceGeneral,
  },
  msgHeader: {
    padding: spaceGeneral,
    borderColor: greyDark,
    borderWidth: 1,
    marginVertical: spaceMore / 2,
  },
  link: {
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
  hotfixTextPaddingTable: {
    paddingRight: spaceGeneral * 2 + 1, // the padding space and the border
  },
  downloadButton: { marginLeft: 0, marginRight: 0 },
});

export { styles };
