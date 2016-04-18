using Microsoft.AspNet.SignalR;
using PortalDB;
using System.Linq;
using System.Threading.Tasks;
using System.Text;
using System.Data.Entity;

namespace RealtimeNotificationWeb.Hubs
{
    public class notificationHub : Hub
    {
        public void sentMessage(string msg)
        {
            Clients.Group("A0A1").updateData(msg);
        }

        public override Task OnConnected()
        {
            Groups.Add(Context.ConnectionId, "A0A1");
            return base.OnConnected();
        }

    }
}


