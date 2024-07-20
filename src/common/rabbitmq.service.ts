import { Injectable, OnModuleInit, OnModuleDestroy  } from "@nestjs/common";
import * as amqp from 'amqplib';


@Injectable()
export class RabbitMQService{
    private connection: amqp.Connection;
    private channel: amqp.Channel;

    constructor(){
        this.init();
    }

    async init(){
        this.connection = await amqp.connect(process.env.RabbitMQ_URI);
        this.channel = await this.connection.createChannel();
    }



    async sendTOQueue(queue: string, message: any){
        await this.channel.assertQueue(queue, ({durable: true}));
        this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)))
    }
}