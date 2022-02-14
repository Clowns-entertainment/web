from abc import ABC, abstractmethod


class NotificationClient(ABC):
    """
    Notification service client interface.
    """
    host: str = 'notifier'
    port: int = 9900

    @abstractmethod
    def send_by_email_after_registration(self, address: str):
        """
        Sets the task for the notification service to send a message about registration.

        Args:
            *address: Address
        """

    # @abstractmethod
    # def send_by_email_with_template(self, *addresses: str, subject: str, text: str, **params):
    #     """
    #     Sets the task for the notification service to send a message with the specified subject and text
    #     by e-mail to all the listed `addresses`.
    #
    #     Args:
    #         *addresses: Addressees
    #         subject: Message subject
    #         text: Message text
    #
    #     Raises:
    #         Occurs when the service cannot accept a client task.
    #         The exception must contain the reason for the refusal.
    #     """
    #
    # @abstractmethod
    # def send_by_email_without_template(self, *addresses: str, subject: str, text: str, **params):
    #     """
    #     Sets the task for the notification service to send a message with the specified subject and text
    #     by e-mail to all the listed `addresses`.
    #
    #     Args:
    #         *addresses: Addressees
    #         subject: Message subject
    #         text: Message text
    #
    #     Raises:
    #         Occurs when the service cannot accept a client task.
    #         The exception must contain the reason for the refusal.
    #     """