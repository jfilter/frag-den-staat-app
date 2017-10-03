import { Button } from 'react-native-elements';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { primaryColor } from '../../../globals/colors';
import { styles } from './styles';
import BlankContainer from '../BlankContainer';
import Heading from '../Heading';
import Link from '../Link';
import Table from '../Table';
import I18n from '../../../i18n';

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
    tags,
    number_of_requests: nRequests,
  } = publicBody;
  const jurisdiction = (
    <Link
      label={publicBody.jurisdiction.name}
      url={publicBody.jurisdiction.site_url}
    />
  );
  const website = <Link label={url} url={url} />;

  const printableTags =
    tags.length > 0 ? tags.map(x => x.name).join(', ') : null;
  const tableData = [
    { label: I18n.t('jurisdiction'), value: jurisdiction },
    {
      label: I18n.t('classification'),
      value: <Text>{classification}</Text>,
    },
    { label: I18n.t('website'), value: website },
    {
      label: I18n.t('email'),
      value: <Text>{email}</Text>,
    },
    {
      label: I18n.t('address'),
      value: <Text>{address}</Text>,
    },
    {
      label: I18n.t('contact'),
      value: <Text>{contact}</Text>,
    },
    {
      label: I18n.t('description'),
      value: <Text>{description}</Text>,
    },
    {
      label: I18n.t('tags'),
      value: <Text>{printableTags}</Text>,
    },
  ];

  const title =
    (nRequests > 0 ? 'Show ' : '') +
    I18n.t('countingRequests', {
      count: nRequests,
    });
  const showRequestsButton = (
    <Button
      disabled={nRequests === 0}
      containerViewStyle={styles.button}
      icon={{ name: 'mail' }}
      title={title}
      backgroundColor={primaryColor}
      onPress={_filterByPublicBody}
    />
  );

  return (
    <BlankContainer>
      <Heading style={styles.heading}>{name}</Heading>
      <Button
        containerViewStyle={styles.button}
        icon={{ name: 'add-circle-outline' }}
        title="TODO: Create a Request"
        backgroundColor={primaryColor}
      />
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
    classification: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    contact: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  changeFilter: PropTypes.func.isRequired,
};

PublicBodyDetails.navigationOptions = {
  title: I18n.t('publicBody'),
};

export default PublicBodyDetails;
