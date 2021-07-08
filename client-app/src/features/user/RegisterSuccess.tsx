import React from "react";
import { RouteComponentProps } from "react-router-dom";
import queryString from "query-string";
import { toast } from "react-toastify";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import agent from "../../app/api/agent";

const RegisterSuccess: React.FC<RouteComponentProps> = ({ location }) => {
	const { email } = queryString.parse(location.search);

	function handleConfirmEmailResend() {
		agent.User.resendEmailConfirm(email as string)
			.then(() => {
				toast.success("Verification email resent - please check your email");
			})
			.catch((error) => console.log(error));
	}

	return (
		<Segment placeholder textAlign="center">
			<Header icon color="green">
				<Icon name="check" />
				Successfully registered!
			</Header>
			<p>
				Please check your email (including junk email) for the verification
				email
			</p>
			{email && (
				<>
					<p>Didn't receive the email? Click the below button to resend</p>
					<Button
						primary
						onClick={handleConfirmEmailResend}
						content="Resend email"
						size="huge"
					/>
				</>
			)}
		</Segment>
	);
};
export default RegisterSuccess;
