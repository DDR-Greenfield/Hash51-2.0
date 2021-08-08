/* eslint-disable no-unused-expressions,
no-param-reassign, no-unused-vars, no-console, consistent-return  */

const express = require('express');
const { Router } = require('express');

const { Evidence } = require('../database/Evidence');
const { Comment } = require('../database/Comment');

const serverRouter = Router();
serverRouter.use(express.json());

const { getImagesFromNasa, nasaIdCall } = require('../helpers/getImages');
const { videoEvidenceSearch } = require('../helpers/getVideos');

serverRouter.get('/', (req, res) => {
  res.json({ message: 'API Initialized!' });
});

serverRouter.post('/searchVideos', (req, res) => {
  const { query } = req.body;
  videoEvidenceSearch(query)
    .then((data) => {
      const videos = data.data.items.map((videoObj) => {
        const video = {
          videoUrl: `http://youtube.com/embed/${videoObj.id.videoId}`,
          videoTitle: videoObj.snippet.title,
          videoDescription: videoObj.snippet.description,
          videoThumbnail: videoObj.snippet.thumbnails.default.url,
          videoId: videoObj.id.videoId,
        };
        return video;
      });
      return videos;
    })
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

serverRouter.post('/search', (req, res) => {
  const { query } = req.body;

  getImagesFromNasa(query)
    .then(({ data }) => data)
    .then((data) => {
      const parsedData = data.collection.items.map((result) => {
        const resultObj = {
          nasa_id: result.data[0].nasa_id,
          title: result.data[0].title,
          created: result.data[0].date_created,
          keywords: result.data[0].keywords,
          thumb: result.links[0].href,
        };
        return resultObj;
      });
      return parsedData;
    })
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

serverRouter.post('/asset', (req, res) => {
  const { query } = req.body;
  nasaIdCall(query)
    .then((data) => data)
    .then((data) => data.data.collection)
    .then((data) => res.status(201).send(data))
    .catch((err) => {
      console.log('Error serverRouter.post /asset', err);
    });
});

serverRouter.get('/story', (req, res) => {
  Evidence.find({}, (err, evidence) => {
    if (err) {
      return res.send(err);
    }
    return res.json(evidence);
  });
});

serverRouter.post('/story', (req, res) => {
  const { story } = req.body;
  Evidence.create(story, (err) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'story successflly added' });
  });
});

serverRouter.get('/story/comments', (req, res) => {
  Comment.find({}, (err, comment) => {
    if (err) {
      return res.send(err);
    }
    return res.json(comment);
  });
});

serverRouter.post('/story/comment', (req, res) => {
  const comment = req.body;
  Evidence.findOneAndUpdate(
    {
      _id: comment.post_id,
    },
    { $push: { comments: comment } },
    (err, story) => {
      if (err) {
        return res.send(err);
      }

      return story.save((error) => {
        if (error) {
          res.send(error);
        }
        res.json({ message: 'comment successfylly added' });
      });
    },
  );
});

serverRouter.put('/story/comments/:comment_id', (req, res) => {
  Comment.findById(req.params.comment_id, (err, comment) => {
    if (err) {
      return res.send(err);
    }

    req.body.author ? (comment.author = req.body.author) : null;
    req.body.text ? (comment.text = req.body.text) : null;

    comment.save((error) => {
      if (err) {
        return res.send(error);
      }
      return res.json({ message: 'comment was updated successfully' });
    });
  });
});

serverRouter.delete('/story/comments/:comment_id', (req, res) => {
  Comment.deleteOne({ _id: req.params.comment_id }, (err, comment) => {
    if (err) {
      return res.send(err);
    }
    return res.json({ message: 'comment was deleted successfully!' });
  });
});

serverRouter.put('/story/:evidence_id', (req, res) => {
  Evidence.findById(req.params.evidence_id, (err, evidence) => {
    if (err) {
      return res.send(err);
    }

    req.body.textBody ? (evidence.textBody = req.body.textBody) : null;
    req.body.userName ? (evidence.userName = req.body.userName) : null;
    req.body.originalEvidence ?
      (evidence.originalEvidence = req.body.originalEvidence) :
      null;

    evidence.save((error) => {
      if (err) {
        res.send(error);
      }
      return res.json({ message: 'Evidence was updated successfully' });
    });
  });
});

serverRouter.delete('/storyDelete/:_id', (req, res) => {
  const { _id } = req.params;
  Evidence.deleteOne({ _id }, (err, evidence) => {
    if (err) {
      return res.send(err);
    }
    return res.json({ message: `${evidence} was deleted successfully` });
  });
});

serverRouter.patch('/storyUpdate', (req, res) => {
  console.log('req.body', req.body);
  const { newTitle, _id, newDescription } = req.body;
  Evidence.findOneAndUpdate(
    { _id },
    { userTitle: newTitle, bodyText: newDescription },
  ).then((data) => {
    res.status(201).send(data);
  });
});

module.exports = {
  serverRouter,
};
