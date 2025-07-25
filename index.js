const express = require('express');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors')

const app = express();
app.use(bodyParser.json());
app.use(cors())

// 🔑 Supabase credentials (replace with your actual values)
const supabaseUrl = 'https://kswtxjnbniutauoglmak.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtzd3R4am5ibml1dGF1b2dsbWFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxNjMzOTQsImV4cCI6MjA2ODczOTM5NH0.KKzDa4gKPo_9P_WOTm8Z4ywi6KbR7Ff_mbnrXLplpZg';
const supabase = createClient(supabaseUrl, supabaseKey);

// 🟢 READ: Get all users
app.get('/users', async (req, res) => {
  const { data, error } = await supabase.from('users').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// 🟡 CREATE: Add new user

app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  const { data, error } = await supabase.from('users').insert([{ name, email }]).select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

// 🔵 UPDATE: Modify user by ID
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;  
  const { data, error } = await supabase.from('users').select('*').eq('id', id);
  if (error) return res.status(500).json({ error: error.message }); 
  if (data.length === 0) return res.status(404).json({ error: 'User not found' });
  res.json(data[0]);
  
})

  
app.put('/users/:id', async (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;
  const { data, error } = await supabase.from('users').update({ name, email }).eq('id', id).select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

// 🔴 DELETE: Remove user by ID
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('users').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'User deleted successfully' });
});

// 🚀 Start server
app.listen(3000, () => {

  console.log('Server running at http://localhost:3000');
});
