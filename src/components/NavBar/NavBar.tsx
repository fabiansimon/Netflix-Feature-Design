import React from 'react';
import styles from './NavBar.module.css';
import Body from '../typography/body/Body';
import Logo from '../Logo/Logo';

type Props = {
  idx?: number,
  navigateView: (idx: number) => void,
}

export default function NavBar({ idx, navigateView }: Props) {
	const menuOptions: string[] = ['Home', 'TV Shows', 'Movies', 'News & Popular', 'My List', 'Browse by Languages', 'Movie Night'];

	return (
		<div className={styles.container}>
			<Logo />
			{menuOptions.map((option, index) => 
				<Body
					key={index}
					type={1}
					style={{fontWeight: index === idx ? '700' : '400', marginRight: 20}}
					onPress={()=> navigateView(index)}
					text={option} />
			)}
		</div>
	);
}