from channels.generic.websocket import AsyncWebsocketConsumer
 
class NotificationConsumer(AsyncWebsocketConsumer):
    async def websocket_connect(self, event):
        user = self.scope["user"]
        await self.accept()