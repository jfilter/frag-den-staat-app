import { StyleSheet } from 'react-native';

import {
  greyDark,
  greyLight,
  primaryColor,
  secondaryColor,
} from '../../../globals/colors';
import { spaceMore, spaceNormal } from '../../../globals/content';

const styles = StyleSheet.create({
  heading: {
    marginTop: spaceMore,
    marginBottom: spaceNormal,
    paddingHorizontal: spaceNormal,
  },
  subheading: {
    paddingHorizontal: spaceNormal,
  },
  subheadingJurisdiction: {
    textAlign: 'center',
    marginHorizontal: spaceNormal,
    color: greyDark,
  },
  subheadingTo: {
    textAlign: 'center',
    marginBottom: spaceNormal,
    color: greyDark,
  },
  table: {
    marginTop: spaceMore,
  },
  summary: {
    marginTop: spaceNormal,
    marginBottom: spaceNormal / 2,
    paddingHorizontal: spaceNormal,
    borderBottomWidth: 1,
    borderColor: greyLight,
    paddingBottom: spaceNormal,
  },
  msgContainer: {
    borderBottomWidth: 1,
    borderColor: greyLight,
    paddingBottom: spaceNormal,
  },
  msgHeader: {
    padding: spaceNormal,
    borderColor: primaryColor,
    borderWidth: 1,
    // borderRadius: 25,
  },
  link: {
    color: primaryColor,
  },
  msgContent: {
    padding: spaceNormal,
    borderColor: secondaryColor,
    borderWidth: 1,
    marginBottom: spaceMore / 2,
  },
  attachmentsRowLabel: {
    flex: 1,
    flexDirection: 'row',
  },
  attachmentsRowButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: spaceNormal,
  },
  viewPdfButton: {
    marginLeft: spaceNormal,
    marginRight: 0,
  },
  dividerAttachments: {
    backgroundColor: greyLight,
    marginBottom: spaceNormal,
  },
  dividerBeforeMessageContent: {
    backgroundColor: greyLight,
    marginBottom: spaceNormal,
    marginTop: spaceNormal,
  },
  hotfixTextPaddingTable: {
    paddingRight: spaceNormal * 2 + 1, // the padding space and the border
  },
  downloadButton: { marginLeft: 0, marginRight: 0 },
  item2: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});

export { styles };
