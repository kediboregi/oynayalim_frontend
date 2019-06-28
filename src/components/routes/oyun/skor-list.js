import React from 'react';

import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

const SkorList = ({ skorlar }) => (
	<Box>
		{skorlar.map((skor, ii) => (
			skorlar.length == +ii+1 ? ( skor.divider=true ) : ( skor.divider=false ),
			<Box key={skor.id} pb={skor.divider ? (1) : (0)}>
				<span>{ skor.deger }</span>
			</Box>

		))}
	</Box>
);

export default SkorList;
