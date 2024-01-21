import { Router } from 'express'

export const messagesRouter = Router()

messagesRouter
  .get('/', async (req, res) => {})
  .get('/:uid', async (req, res) => {})
  .post('/', async (req, res) => {})
  .put('/:uid', async (req, res) => {})
  .delete('/:uid', async (req, res) => {})
