import { Text } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { styles } from './styles';
import BlankContainer from '../../library/BlankContainer';
import Heading from '../../library/Heading';
import I18n from '../../../i18n';
import Link from '../../library/Link';
import StandardButton from '../../library/StandardButton';
import Table from '../../library/Table';
import { primaryColor } from '../../../globals/colors';

const PublicBodyDetails = ({
  publicBody,
  changeFilter,
  navigateToFoiRequests1,
  navigateToFoiRequests2,
}) => {
  const _filterByPublicBody = () => {
    // FIXME: It'a hack because there was another problem with react-navigation. It wasn't able to navigate to the Request stack when the stack was empty. This fixes it.
    changeFilter({
      publicBody: { param: publicBody.id, label: publicBody.name },
      status: null, // reset status
    });
    navigateToFoiRequests1();
    navigateToFoiRequests2();
  };

  const {
    name,
    url,
    classification,
    email,
    address,
    contact,
    description,
    categories,
    number_of_requests: nRequests,
    jurisdiction,
  } = publicBody;

  const printableCategories =
    categories.length > 0 ? categories.map(x => x.name).join(', ') : null;

  const tableData = [
    {
      label: I18n.t('jurisdiction'),
      value: <Link label={jurisdiction.name} url={jurisdiction.site_url} />,
    },
    // Stefan changed something
    // {
    //   label: I18n.t('classification'),
    //   value: <Text selectable>{classification.name}</Text>,
    // },
    { label: I18n.t('website'), value: <Link label={url} url={url} /> },
    {
      label: I18n.t('email'),
      value: <Text selectable>{email}</Text>,
    },
    {
      label: I18n.t('address'),
      value: <Text selectable>{address}</Text>,
    },
    {
      label: I18n.t('contact'),
      value: <Text selectable>{contact}</Text>,
    },
    {
      label: I18n.t('description'),
      value: <Text selectable>{description}</Text>,
    },
    {
      label: I18n.t('tags'),
      value: <Text selectable>{printableCategories}</Text>,
    },
  ];

  const title =
    (nRequests > 0 ? 'Show ' : '') +
    I18n.t('countingRequests', {
      count: nRequests,
    });

  const disabled = nRequests === 0;

  const showRequestsButton = (
    <StandardButton
      disabled={disabled}
      icon={{ name: 'mail', color: primaryColor }}
      title={title}
      onPress={_filterByPublicBody}
      containerViewStyle={{
        marginBottom: 20,
      }}
    />
  );

  return (
    <BlankContainer>
      <Heading style={styles.heading}>{name}</Heading>
      {/* <StandardButton
        icon={{ name: 'add-circle-outline' }}
        title="TODO: Create a Request"
      /> */}
      {showRequestsButton}
      <Table data={tableData} />
    </BlankContainer>
  );
};

PublicBodyDetails.propTypes = {
  publicBody: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    // classification: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    contact: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  changeFilter: PropTypes.func.isRequired,
};

PublicBodyDetails.navigationOptions = {
  title: I18n.t('publicBody'),
  drawerLockMode: 'locked-closed', // disable global drawer
};

export default PublicBodyDetails;
