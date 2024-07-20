import { RabbitMQService } from './rabbitmq.service';
import * as amqp from 'amqplib';

jest.mock('amqplib');

describe('RabbitMQService', () => {
  let rabbitMQService: RabbitMQService;
  let mockConnection: any;
  let mockChannel: any;

  beforeEach(async () => {
    mockConnection = {
      createChannel: jest.fn(),
    };
    mockChannel = {
      assertQueue: jest.fn(),
      sendToQueue: jest.fn(),
    };
    (amqp.connect as jest.Mock).mockResolvedValue(mockConnection);
    (mockConnection.createChannel as jest.Mock).mockResolvedValue(mockChannel);

    rabbitMQService = new RabbitMQService();
    await new Promise(process.nextTick); // Ensure `init` completes
  });

  it('should be defined', () => {
    expect(rabbitMQService).toBeDefined();
  });

  it('should initialize connection and channel', async () => {
    expect(amqp.connect).toHaveBeenCalledWith(process.env.RabbitMQ_URI);
    expect(mockConnection.createChannel).toHaveBeenCalled();
  });

  it('should send a message to the queue', async () => {
    const queue = 'test_queue';
    const message = { test: 'message' };
    await rabbitMQService.sendTOQueue(queue, message);
    expect(mockChannel.assertQueue).toHaveBeenCalledWith(queue, { durable: true });
    expect(mockChannel.sendToQueue).toHaveBeenCalledWith(queue, Buffer.from(JSON.stringify(message)));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
