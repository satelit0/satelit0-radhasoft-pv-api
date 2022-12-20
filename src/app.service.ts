import { Injectable } from '@nestjs/common';
import { networkInterfaces } from 'os';

@Injectable()
export class AppService {
  getHello(): any {
    
    function getAccessibleHosts(ipv4 = false) {
      const hosts: string[] = [];
      Object.values(networkInterfaces())
      .forEach((net) => 
        net?.forEach(({ family, address, mac }) => {
        //   if (!ipv4 || family === "IPv4") hosts.push(mac);
        })
      );
      return hosts;
   }
    // return getAccessibleHosts(true); 
  }
}
