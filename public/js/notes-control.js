var _noteList, 
	_noteName, 
	_noteContent;

var noteView = {
	id: 0,
	name: '',
	content: ''
};

function SetNoteView(note) {
	if(!note) return;

	noteView.id = note.id;
	noteView.name = note.name;
	noteView.content = note.content;

	_noteName.val(note.name);
	_noteContent.val(note.content);
}

function ClearNoteView() {
	if(noteView.id == 0) return;

	noteView.id = 0;
	noteView.name = '';
	noteView.content = '';

	_noteName.val('');
	_noteContent.val('');

	List.clearFocus();
}

function noteTemplate(obj) {
	var date = obj.created_at.split(/[- :]/),
		dateTime = date[2] + '.' + date[1] + '.' + date[0];
		dateTime += ' @ ' + date[3] + ':' + date[4] + ':' + date[5];

	var note = '<div class="note-container" data-target="' + obj.id + '">';
		note += '<div class="note-options"><div class="note-remove"></div></div>';
		note += '<div class="note-name"></div>';
		note += '<div class="note-date">' + dateTime + '</div>';
		note += '<div class="note-content"></div>';
		note += '</div>';
	
	var $note = $(note);
	$note.find('.note-name').text(obj.name);
	$note.find('.note-content').text(obj.content);
	
	return $note;
}

function notes(props, callback) {
	if(typeof(props) == 'undefined') return;

	var _url, _type, _data = null;

	switch(props.action) {
		case 'get':
				_url = (props.note) ? '/notes/' + props.note : '/notes';
				_type = 'GET';
			break;
		case 'set':
				_url = '/notes',
				_type = 'POST';
				_data = props.data;
			break;
		case 'update':
				_url = '/notes/' + props.note;
				_type = 'PUT';
				_data = props.data;
			break;
		case 'delete':
				_url = '/notes/' + props.note;
				_type = 'DELETE';
			break;
	}

	$.ajax({
		url: _url,
		headers : { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
		type: _type,
		data: _data,
		dataType: (!props.dataType) ? 'JSON' : props.dataType,
		success: function(data) {
			if(data) callback(data);
		}
	});
}

var List = {
	notes: function() {
		return _noteList.children('div');
	},
	append: function(data) {
		_noteList.append(noteTemplate(data));
	},
	prepend: function(data) {
		_noteList.prepend(noteTemplate(data));
	},
	getNote: function(id) {
		return _noteList.find('.note-container[data-target=' + id + ']');
	}, 
	removeNote: function(id) {
		this.getNote(id).remove();
	},
	clearFocus: function() {
		this.notes().removeClass('active');
	},
	focusNote: function(id) {
		var note = this.getNote(id);
		if(note.hasClass('active')) return;

		if(this.notes().hasClass("active")) this.notes().removeClass("active");
		note.addClass('active');
	}
};

function setupNote(name = '', content = '') {
	notes({ action: 'set', data: { name: name, content: content } }, function(data) {
		if(data.status) {
			notes({ action: 'get', note: data.id }, function(data) {
				var note = data.note;
				List.prepend(note); SetNoteView(note);

				List.getNote(noteView.id).hide().fadeIn(250);
				List.focusNote(noteView.id);;
			});
		}
	});
}

$(document).ready(function() {
	// Set shortcuts
	_noteList = $('.note-list');
	_noteName = $('#note-name');
	_noteContent = $('#note-content');

	
	// Load notes by default
	notes({ action: 'get' }, function(data) {
		var notes = data.notes;

		if(typeof(notes.length) == 'undefined') {
			List.append(notes);
			return;
		}

		if(notes.length) {
			for(var i = 0; i < notes.length; i++) {
				List.append(notes[i]);
			}
		} 
	});

	// Add new note
	$('#new-note').click(function() {
		ClearNoteView(); _noteName.focus();
	});

	// Note click selected
	$('.note-list').on('click', '.note-container', function() {
		notes({ action: 'get', note: $(this).attr('data-target') }, function(data) {
			SetNoteView(data.note);
			List.focusNote(noteView.id);
		});
	});

	// Note delete
	$('.note-list').on('click', '.note-remove', function(e) {
		e.stopPropagation();
		if(!confirm("Are you sure?")) return;

		var el = $(this).parents('.note-container'),
			target = el.attr('data-target');

		notes({ action: 'delete', note: target }, function(data) {
			if(data.status) {
				ClearNoteView();
				el.fadeOut(100, function() {
					$(this).remove();
				});
			}
		});
	});

	// Note view change
	$('#note-name, #note-content').change(function() {
		var noteName = _noteName.val(),
			noteContent = _noteContent.val();

		if(noteView.id == 0) {
			setupNote(noteName, noteContent);
			return;
		}


		if(noteView.name == noteName && noteView.content == noteContent) return;

		noteView.name = noteName;
		noteView.content = noteContent;

		var dataPack = {
			name: noteView.name, 
			content: noteView.content 
		};

		notes({ action: 'update', note: noteView.id, data: dataPack }, function(data) {
			if(data.status) {
				var el = List.getNote(noteView.id);
				el.find('.note-name').text(noteView.name);
				el.find('.note-content').text(noteView.content);
			}
		});
	});
});
