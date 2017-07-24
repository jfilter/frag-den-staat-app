import { ScrollView, Text } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import Link from '../Link';
import Table from '../Table';
import { styles } from './styles';

const PublicBodySingle = ({ publicBody }) => {
  const jurisdiction = (
    <Link
      label={publicBody.jurisdiction.name}
      url={publicBody.jurisdiction.site_url}
    />
  );
  const website = <Link label={publicBody.url} url={publicBody.url} />;

  const tableData = [
    { label: 'Jurisdiction', value: jurisdiction },
    {
      label: 'Classification',
      value: (
        <Text>
          {publicBody.classification}
        </Text>
      ),
    },
    { label: 'Website', value: website },
    {
      label: 'Email',
      value: (
        <Text>
          {publicBody.email}
        </Text>
      ),
    },
    {
      label: 'Address',
      value: (
        <Text>
          {publicBody.address}
        </Text>
      ),
    },
    {
      label: 'Contact',
      value: (
        <Text>
          {publicBody.contact}
        </Text>
      ),
    },
  ];

  return (
    <ScrollView style={styles.scrollView}>
      <Text style={styles.heading}>
        {publicBody.name}
      </Text>
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
  }).isRequired,
};

PublicBodySingle.navigationOptions = {
  title: 'Public Body',
};

export default PublicBodySingle;
