import React, { useContext } from "react";
import { Menu, Container, Button, Dropdown, Image } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink, Link } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";

const NavBar: React.FC = () => {
	const rootStore = useContext(RootStoreContext);
	const { user, logout } = rootStore.userStore;
	return (
		<Menu fixed="top" inverted>
			<Container>
				<Menu.Item header as={NavLink} exact to="/">
					<img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} />
					Marcas e Patentes
				</Menu.Item>
				{user && <Menu.Item name="Activities" as={NavLink} to="/activities" />}
				{user && (
					<Menu.Item>
						<Button
							as={NavLink}
							to="/createActivity"
							positive
							content="Criar Novo Evento"
						/>
					</Menu.Item>
				)}
				{user && (
					<Menu.Item>
						<Button
							as={NavLink}
							to="/createMarca"
							positive
							content="Inserir Marca"
						/>
					</Menu.Item>
				)}
				{user && (
					<Menu.Item>
						<Button
							as={NavLink}
							to="/marcas"
							positive
							content="List de Marcas"
						/>
					</Menu.Item>
				)}
				{user && (
					<Menu.Item position="right">
						<Image
							avatar
							spaced="right"
							src={user.image || "/assets/user.png"}
						/>
						<Dropdown pointing="top left" text={user.displayName}>
							<Dropdown.Menu>
								<Dropdown.Item
									as={Link}
									to={`/profile/${user.username}`}
									text="My profile"
									icon="user"
								/>
								<Dropdown.Item onClick={logout} text="Logout" icon="power" />
							</Dropdown.Menu>
						</Dropdown>
					</Menu.Item>
				)}
			</Container>
		</Menu>
	);
};

export default observer(NavBar);