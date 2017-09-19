import { Button } from 'react-native-elements';
import { ScrollView, Text } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { primaryColor } from '../../styles/colors';
import { styles } from './styles';
import Heading from '../Heading';
import Link from '../Link';
import Table from '../Table';

const PublicBodySingle = ({
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
    number_of_requests,
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
    { label: 'Jurisdiction', value: jurisdiction },
    {
      label: 'Classification',
      value: <Text>{classification}</Text>,
    },
    { label: 'Website', value: website },
    {
      label: 'Email',
      value: <Text>{email}</Text>,
    },
    {
      label: 'Address',
      value: <Text>{address}</Text>,
    },
    {
      label: 'Contact',
      value: <Text>{contact}</Text>,
    },
    {
      label: 'Description',
      value: <Text>{description}</Text>,
    },
    {
      label: 'Tags',
      value: <Text>{printableTags}</Text>,
    },
  ];

  const title = `Show ${number_of_requests} Requests`;
  const buttondisabled = number_of_requests === 0 ? true : false;
  const showRequestsButton = (
    <Button
      disabled={buttondisabled}
      containerViewStyle={styles.button}
      icon={{ name: 'mail' }}
      title={title}
      backgroundColor={primaryColor}
      onPress={_filterByPublicBody}
    />
  );

  return (
    <ScrollView style={styles.scrollView}>
      <Heading style={styles.heading}>{name}</Heading>
      <Button
        containerViewStyle={styles.button}
        icon={{ name: 'add-circle-outline' }}
        title="TODO: Create a Request"
        backgroundColor={primaryColor}
      />
      {showRequestsButton}
      <Table data={tableData} />
    </ScrollView>
  );
};

PublicBodySingle.propTypes = {
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

PublicBodySingle.navigationOptions = {
  title: 'Public Body',
};

export default PublicBodySingle;
